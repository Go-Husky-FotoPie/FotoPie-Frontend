pipeline {
    agent any
    tools {
        nodejs '19.8.1'
    }
    environment {
        BACKEND_API = credentials('BACKEND_API')
        Get_Synonyms_API_Prefix = credentials('Get_Synonyms_API_Prefix')
        ECR_REGISTRY = '123436089261.dkr.ecr.ap-southeast-2.amazonaws.com'
        DOCKER_IMAGE = 'gohusky-frontend'
        TAG = 'latest'
        ECR_REGION = credentials('ECR_REGION')
        gohusky = credentials('gohusky')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/DO-006-shelton']], userRemoteConfigs: [[url: 'https://github.com/Go-Husky-FotoPie/FotoPie-Front-end.git']]])
            }
        }

        stage('Dockerize') {
            steps {
                withCredentials([
                    string(credentialsId: 'BACKEND_API', variable: 'BACKEND_API'),
                    string(credentialsId: 'Get_Synonyms_API_Prefix', variable: 'Get_Synonyms_API_Prefix')
                ]) {
                    sh "docker build --build-arg BACKEND_API=\"$BACKEND_API\" --build-arg Get_Synonyms_API_Prefix=\"$Get_Synonyms_API_Prefix\" -t ${env.DOCKER_IMAGE}:${env.TAG} ."
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withAWS(region: "${env.ECR_REGION}", credentials: "${env.gohysky}") {
                    sh 'aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin ${env.ECR_REGISTRY}'
                }
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh "docker tag ${env.DOCKER_IMAGE}:${env.TAG} ${env.ECR_REGISTRY}/${env.DOCKER_IMAGE}:${env.TAG}"
                sh "docker push ${env.ECR_REGISTRY}/${env.DOCKER_IMAGE}:${env.TAG}"
            }
        }
    }
}
