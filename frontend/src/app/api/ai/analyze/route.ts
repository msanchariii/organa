// app/api/ai/analyze/route.ts - Integrated AI service
import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, createErrorResponse, createSuccessResponse } from '@/lib/auth'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function POST(request: NextRequest) {
  try {
    await verifyAuth(request)
    
    const { patient, organ, match } = await request.json()

    const prompt = `
Generate a detailed analysis of the organ transplant match, including patient and organ compatibility, surgical considerations, and expected outcomes:

### Patient Information:
- **Blood Type**: ${patient.blood_type}
- **Priority Status**: ${patient.priority_status}
- **Medical History**: ${patient.medical_history}
- **HLA A**: ${patient.hla_test?.hlaA || 'N/A'}
- **HLA B**: ${patient.hla_test?.hlaB || 'N/A'}
- **HLA C**: ${patient.hla_test?.hlaC || 'N/A'}
- **HLA DRB1**: ${patient.hla_test?.hlaDRB1 || 'N/A'}
- **HLA DQB1**: ${patient.hla_test?.hlaDQB1 || 'N/A'}
- **Comorbidities**: ${patient.comorbidities || 'None listed'}
- **Current Medications**: ${patient.current_medications || 'None listed'}
- **Weight (kg)**: ${patient.weight_in_kg || 'N/A'}
- **Height (cm)**: ${patient.height_in_cm || 'N/A'}
- **Primary Diagnosis**: ${patient.primary_diagnosis}

### Organ Information:
- **Organ Type**: ${organ.organ_type}
- **Donor Age**: ${organ.donor_age}
- **Donor Blood Type**: ${organ.donor_blood_type}
- **Donor Gender**: ${organ.donor_gender}
- **Organ Condition**: ${organ.organ_condition_rating}
- **Recovery Date**: ${organ.recovery_date}
- **HLA A**: ${organ.hla_a || 'N/A'}
- **HLA B**: ${organ.hla_b || 'N/A'}
- **HLA C**: ${organ.hla_c || 'N/A'}
- **HLA DRB1**: ${organ.hla_drb1 || 'N/A'}
- **HLA DQB1**: ${organ.hla_dqb1 || 'N/A'}
- **Expected Preservation Time**: ${organ.expected_preservation_time} hours
- **Viral Testing Status**: ${organ.viral_testing_status}

### Match Score: ${match.match_score || 'N/A'}

### Requested Analysis:
1. **Compatibility Assessment**: How well does the organ match the patient?
2. **Surgical Considerations**: What are the potential surgical challenges?
3. **Risk Assessment**: What are the chances of organ rejection?
4. **Post-Transplant Care**: What is the recommended post-surgical care?
5. **Prognosis**: What is the expected outcome for the patient?
6. **Time Sensitivity**: Any urgent considerations given preservation time?

Generate detailed insights based on the data provided to ensure the best possible outcomes.
    `

    try {
      const result = await model.generateContent(prompt)
      const analysis = result.response.text()
      
      return createSuccessResponse({
        analysis,
        generated_at: new Date().toISOString(),
        confidence: 'high'
      })
    } catch (aiError) {
      console.error('AI Analysis Error:', aiError)
      
      // Fallback analysis
      const fallbackAnalysis = `
**Compatibility Analysis**
- Blood Type Match: ${organ.donor_blood_type === patient.blood_type ? 'Compatible' : 'Needs verification'}
- Match Score: ${match.match_score || 'Calculating...'}
- Priority Level: ${patient.priority_status >= 7 ? 'High' : patient.priority_status >= 4 ? 'Medium' : 'Standard'}

**Recommendations**
- Proceed with detailed medical evaluation
- Verify HLA compatibility testing
- Consider patient's current medical status
- Monitor preservation time: ${organ.expected_preservation_time} hours remaining

**Note**: Detailed AI analysis temporarily unavailable. Please consult medical team for comprehensive evaluation.
      `
      
      return createSuccessResponse({
        analysis: fallbackAnalysis,
        generated_at: new Date().toISOString(),
        confidence: 'basic'
      })
    }

  } catch (error) {
    return createErrorResponse(error.message)
  }
}
