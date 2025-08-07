## Database Schema Documentation

### 🏥 Hospitals

#### thing marked by ✅ are required to be added in the database

| Field Name     | Type              | Description                         |
| -------------- | ----------------- | ----------------------------------- |
| id             | Int               | Primary key                         |
| name           | String            | Name of the hospital                |
| location       | String            | Address or geographical location    |
|zip_code	|Int	|✅ For distance calc|
| contact\_email | String            | Hospital contact email              |
| contact\_phone | String            | Hospital contact number             |
| BloodInventory | \[BloodInventory] | Related blood inventory records     |
| BloodRecipient | \[BloodRecipient] | Linked recipients needing blood     |
| notifications  | \[notifications]  | Hospital notifications              |
| organs         | \[organs]         | Organs associated with the hospital |
| patients       | \[patients]       | Patients admitted/treated           |
| users          | \[users]          | Associated staff                    |

### 👤 Patients

| Field Name             | Type       | Description                              |
| ---------------------- | ---------- | ---------------------------------------- |
| id                     | Int        | Primary key                              |
| name                   | String     | Patient name                             |
| hospital\_id           | Int?       | Foreign key to hospitals                 |
| blood\_type            | String     | ABO blood group                          |
| organ\_needed          | String     | Required organ type                      |
| priority\_status       | Float      | Severity score                           |
| location               | String     | Patient location                         |
| zip\_code              | Int        | ZIP code                                 |
| medical\_history       | String?    | Summary of medical history               |
| date\_of\_birth        | DateTime?  | DOB                                      |
| gender                 | String     | Gender                                   |
| weight\_in\_kg         | Float?     | Weight                                   |
| height\_in\_cm         | Float?     | Height                                   |
| email                  | String     | Patient contact email                    |
| phone\_number          | String     | Patient contact number                   |
| primary\_diagnosis     | String     | Main diagnosis for transplant            |
| hla\_a                       | String?    | ✅HLA-A marker                          |
| hla\_b                       | String?    | ✅HLA-B marker                          |
| hla\_c                       | String?    | ✅HLA-C marker                          |
| hla\_drb1                    | String?    | ✅HLA-DRB1                              |
| hla\_dqb1                    | String?    | ✅HLA-DQB1                              |
| cpra\_score             | Float?     | ✅Calculated Panel Reactive Antibody (calculated pra)   |
| previous\_transplant   | Int        | Number of prior transplants              |
|years_on_dialysis	|Float	|✅if patient is affected |
|has_diabetes	|Boolean	|✅Needed for EPTS|
| epts_score            | Float?    | ✅ Estimated Post-Transplant Survival        |
| comorbidities          | String?    | List of comorbidities                    |
| current\_medications   | String?    | Current prescriptions                    |
| treating\_in\_hospital | String?    | Assigned hospital                        |
| insurance\_details     | String?    | Medical insurance summary                |
| status                 | String     | Current state (waiting/matched/rejected) |
| created\_at            | DateTime?  | Record creation timestamp                |
| matches                | \[matches] | Related matches                          |
| hospitals              | hospitals? | Back-reference                           |

### 🧠 Organs

| Field Name                   | Type       | Description                           |
| ---------------------------- | ---------- | ------------------------------------- |
| id                           | Int        | Primary key                           |
| organ\_type                  | String     | Type (kidney, liver, heart, etc.)     |
| recovery\_date               | DateTime   | Date recovered                        |
| expected\_preservation\_time | Float      | Safe transport time (hours)           |
| donor\_age                   | Int        | Donor age                             |
| donor\_height                   | float        | ✅Donor height                             |
| donor\_weight                   | float       | ✅Donor weight                             |
| donor\_blood\_type           | String     | Donor blood type                      |
| donor\_gender                | String     | Gender of donor                       |
| cause\_of\_death             | String?    | Donor COD (brain death, trauma, etc.) |
| organ\_size                  | String?    | Size label (Small/Medium/Large)       |
| organ\_condition\_rating     | String     | Medical assessment of organ           |
| hla\_a                       | String?    | HLA-A marker                          |
| hla\_b                       | String?    | HLA-B marker                          |
| hla\_c                       | String?    | HLA-C marker                          |
| hla\_drb1                    | String?    | HLA-DRB1                              |
| hla\_dqb1                    | String?    | HLA-DQB1                              |
| donor\_hospital              | String     | Hospital name                         |
| current\_location            | String?    | Transport location                    |
| transport\_arrangements      | String?    | Courier/logistics detail              |
| medical\_history             | String?    | Donor's health background             |
| viral\_testing\_status       | String     | Infectious disease results            |
| organ\_biopsy\_results       | String?    | Histological findings                 |
| serum\_creatinine | Float   | ✅ Needed for KDPI |
| has\_diabetes     | Boolean |✅ Needed for KDPI |
| has\_hypertension | Boolean |✅ Needed for KDPI 
|kdpi\_score  | Float?     | ✅Kidney Donor Profile Index (KDPI) and Kidney Donor Risk Index (KDRI)              
| hospital\_id                 | Int?       | Owning hospital                       |
| status                       | String     | Availability state                    |
| created\_at                  | DateTime?  | Timestamp                             |
| matches                      | \[matches] | Possible matchings                    |
| hospitals                    | hospitals? | Parent link                           |

### 🤝 Matches

| Field Name   | Type      | Description                           |
| ------------ | --------- | ------------------------------------- |
| id           | Int       | Primary key                           |
| organ\_id    | Int?      | Foreign key to organs                 |
| patient\_id  | Int?      | Foreign key to patients               |
| match\_score | Float?    | Compatibility score                   |
| status       | String?   | Match status (accepted/rejected/etc.) |
| matched\_by  | Int?      | ID of staff that confirmed match      |
| created\_at  | DateTime? | Match timestamp                       |
| ai\_summary  | String?   | AI explanation (optional)             |
| users        | users?    | User who handled                      |
| organs       | organs?   | Linked organ info                     |
| patients     | patients? | Linked patient info                   |

### 👨‍⚕️ Users

| Field Name   | Type       | Description                      |
| ------------ | ---------- | -------------------------------- |
| id           | Int        | Primary key                      |
| email        | String?    | Email for login                  |
| password     | String?    | Encrypted password               |
| role         | String?    | Role (admin, nurse, coordinator) |
| hospital\_id | Int?       | FK to hospital                   |
| staff\_id    | String?    | Unique hospital staff code       |
| created\_at  | DateTime?  | Date created                     |
| matches      | \[matches] | Matches handled                  |
| hospitals    | hospitals? | Assigned hospital                |

### 🩸 Blood Inventory

| Field Name     | Type      | Description           |
| -------------- | --------- | --------------------- |
| id             | Int       | Primary key           |
| bloodType      | String    | A, B, AB, O           |
| unitsAvailable | Int       | No. of units in stock |
| donorHospital  | String    | Source                |
| lastUpdated    | DateTime  | Last inventory update |
| hospitalId     | Int       | FK to hospitals       |
| hospital       | hospitals | Back-reference        |

### 🧍 Blood Recipient

| Field Name       | Type      | Description                  |
| ---------------- | --------- | ---------------------------- |
| id               | Int       | Primary key                  |
| name             | String    | Recipient name               |
| bloodType        | String    | A, B, AB, O                  |
| unitsNeeded      | Int       | No. of units requested       |
| priorityStatus   | String    | Urgency level                |
| location         | String    | Geographical area            |
| hospitalId       | Int       | FK to hospital               |
| phone            | String?   | Contact number               |
| email            | String?   | Contact email                |
| medicalCondition | String?   | Health condition             |
| status           | String    | Pending, fulfilled, rejected |
| hospital         | hospitals | Parent                       |

### 🔔 Notifications

| Field Name   | Type      | Description          |
| ------------ | --------- | -------------------- |
| id           | Int       | Primary key          |
| hospital\_id | Int       | FK to hospitals      |
| message      | String    | Notification message |
| created\_at  | DateTime? | Timestamp            |
| hospitals    | hospitals | Back-reference       |

