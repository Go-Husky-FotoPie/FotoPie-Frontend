pipeline {
    agent any
    tools {
        nodejs '19.8.1'
    }
    // environment {
    //     BACKEND_API=credentials('BACKEND_API')
    //     Get_Synonyms_API_Prefix=credentials('Get_Synonyms_API_Prefix')
    // }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/DO-006-shelton']], userRemoteConfigs: [[url: 'https://github.com/Go-Husky-FotoPie/FotoPie-Front-end.git']]])
            }
        }

        stage('Build Docker') {
            environment {
                BACKEND_API=credentials('BACKEND_API')
                Get_Synonyms_API_Prefix=credentials('Get_Synonyms_API_Prefix')
            }
            steps {
                sh 'docker build --build-arg BACKEND_API=$BACKEND_API --build-arg Get_Synonyms_API_Prefix=$Get_Synonyms_API_Prefix -t gohusky-frontend .'
            }




        stage('tag image') {
            steps {
        
                // withAWS(region: 'ap-southeast-2', credentials: 'AWS_CRED') {
                    sh "docker tag gohusky-frontend:latest 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com/gohusky-frontend:latest"
                
            }
        }

        // stage('Push Docker Image to ECR') {
        //     steps {
        //         withAWS(region: 'ap-southeast-2', credentials: 'AWS_CRED') {
        //             sh 'aws ecr get-login --no-include-email --region ap-southeast-2 | docker get-login --username AWS --password-stdin 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com'
        //             // sh "docker push 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com/gohusky-frontend:latest"
        //         }
        stage('Push Docker Image to ECR') {
            steps {

                // Authenticate with ECR
                withAWS(region: 'ap-southeast-2', credentials: 'AWS_CRED') {
                    sh "aws ecr get-login-password --no-include-email --region ap-southeast-2 | docker login --username AWS --password-stdin 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com"
                
                // Push the Docker image
                sh 'docker tag gohusky-frontend:latest 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com/gohusky-frontend:latest'
                sh 'docker push 123436089261.dkr.ecr.ap-southeast-2.amazonaws.com/gohusky-frontend:latest'
            }
            }
        }
    }
}