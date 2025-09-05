// Add this import at the top
import { NotificationService } from '@/lib/notifications'

// In your POST method, replace the axios calls with:

// After creating matches, replace notification logic:
if (viablePatients.length > 0) {
  console.log("Top match:", viablePatients[0].name, "Score:", viablePatients[0].score)
  
  // Send match found notification
  await NotificationService.notifyMatchFound(
    newOrgan.id, 
    viablePatients[0].id, 
    viablePatients[0].score
  )
  
  for (const patient of viablePatients) {
    try {
      const newMatch = await prisma.matches.create({
        data: {
          organ_id: newOrgan.id,
          patient_id: patient.id,
          match_score: patient.score,
          status: "pending",
          matched_by: user.id
        }
      })

      // Generate AI summary using new integrated service
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ai/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient, match: newMatch, organ: newOrgan })
        })

        if (response.ok) {
          const aiData = await response.json()
          await prisma.matches.update({
            where: { id: newMatch.id },
            data: { ai_summary: aiData.data.analysis }
          })
        }
      } catch (aiError) {
        console.error('AI summary generation failed:', aiError)
      }

    } catch (matchError) {
      console.error('Failed to create match:', matchError)
    }
  }
}
