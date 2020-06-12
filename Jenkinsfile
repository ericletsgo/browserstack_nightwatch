browserstack('7099d563-b267-4d4a-918f-8250b2ca0ee0') {
  spipeline {
    // agent {
    //     docker {
    //         image 'node:6-alpine'
    //         args '-p 3000:3000'
    //     }
    // }
    environment { 
      CI = 'true'
    }
    stages {
      stage('Build') {
        steps {
          sh 'npm install'
        }
      }
      stage('Test') {
        steps {
          sh 'npm run single'
        }
      }
    }
  }
}