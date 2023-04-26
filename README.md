
# Bank Record Analyzer and Visualization Tool

The project is a web application that allows users to upload bank records in the form of PDF or image files, extract transaction data from them using OCR technology, and visualize the transactions using a graph. The application also allows users to add and manage entities (e.g. bank accounts, vendors, etc.) and view transaction details for each entity. The project uses various technologies such as React, Flask, Firebase, and Tesseract OCR. 
## Features

- Upload bank records in PDF or image format
- Extract transaction data from bank records using OCR technology
- Visualize transaction data using a graph
- Add and manage entities (e.g. bank accounts, vendors, etc.)
- View transaction details for each entity
- Export transaction data in CSV format
- User authentication and authorization
- Responsive design for mobile and desktop devices
- Real-time updates for transaction data
- Support for multiple banks and languages.



## Tech Stack
**Back-End:** [Flask](https://flask.palletsprojects.com/en/2.2.x/installation/), [Express JS](https://expressjs.com/)  
**Front-End:** [React](https://react.dev/)  
**OCR:** [Tesseract OCR](https://tesseract-ocr.github.io/)



## Installation
Clone the repository

```bash
  git clone https://github.com/kavach23/kavach23.git
```
## Run locally.
Install the required dependencies for the frontend and backend by running the following commands in the project root directory:
```bash
cd frontend
npm install
cd ../backend
pip install -r requirements.txt
```
- Create a Firebase project and add the Firebase configuration details to the `.env` file in the `frontend` directory.
- Start the backend server by running the following  command in the `backend` directory:
```bash
    python app.py
```
- Start the frontend server by running the following command in the `frontend` directory:
```bash
    npm start
```
- Open a web browser and navigate to http://localhost:3000 to access the application.

- **Note:** The project requires Tesseract OCR to be installed on the system. Please refer to the Tesseract OCR documentation for installation instructions.










## Environment Variables

To run this application, you will need to add the following environment variables to your `.env` file of the `frontend` directory.
| Variable Name | Description |
| :-------- | :------------------------- |
| `REACT_APP_FIREBASE_API_KEY` | Firebase API key for authentication and database access. |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain. |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID. |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket. |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID.  |
| `REACT_APP_FIREBASE_APP_ID` | Firebase app Id |
| `REACT_APP_BACKEND_URL` | Backend server URL. |
| `REACT_APP_BANK_NAME` | Name of the bank for which the OCR is being used. |
| `REACT_APP_LANGUAGE` | Language used in the bank records for OCR. |

## Back-End API Reference

#### Extract transaction data from bank records in PDF format

```http
  POST /pdf
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file` | **Required** bank record file in PDF format. |

#### Extract transaction data from bank records in IMG format

```http
  POST /img
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file` | `file` | **Required**  |


## Front-End Visualization

<!-- ![App Screenshot](https://raw.githubusercontent.com/RohitShah1706/dvote-nextjs-frontend-1706/main/screenshots/01.png)  
![App Screenshot](https://raw.githubusercontent.com/RohitShah1706/dvote-nextjs-frontend-1706/main/screenshots/02.png) -->


## Acknowledgements



## Authors
- [@Heliospook](https://github.com/Heliospook)
- [@todorokishotoua15](https://github.com/todorokishotoua15)
- [@SaiMadhavanG](https://github.com/SaiMadhavanG)
- [@neha-tam](https://github.com/neha-tam)
- [@Chandak-Keshav](https://github.com/Chandak-Keshav)
- [@RohitShah1706](https://github.com/RohitShah1706)


## License

[MIT](https://choosealicense.com/licenses/mit/)

