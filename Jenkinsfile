pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }

    environment {
        BACKEND_API = credentials('BACKEND_API')
        BACKEND_PORT = credentials('BACKEND_PORT')
    }

    stages {
        stage('Checkout') {
            steps {
                sh 'pwd'
                git 'https://github.com/hangzh521/FotoPie-Front-end.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
              sh 'npm install' 
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Export') {
            steps {
                sh 'next export'
                sh 'ls -l out'
            }
        }
        
        stage('Deploy') {
            steps {
                withAWS(region: "${env.AWS_DEFAULT_REGION}", credentials: 'my-aws-credentials') {
                    sh "aws s3 cp /var/lib/jenkins/workspace/aws-p3/out s3://www.hangzh.click/ --recursive"
                }
            }
        }
    }
}

