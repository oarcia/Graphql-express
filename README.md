# Graphql-express
Practica de graphql y express 
son cosas simples para mejorar el entendimiento de graphql para correrlo aun no se integran
los scripts de npm y se tiene que correr con 
node index.js posterior mente levantas el localhost:300/graphql  
puedes hacer busquedas con  el nombre del tema del curso como se muestra abajo

query getCourses($courseTopic: String!){
  courses(topic: $courseTopic){
    title
    description
  }
}

le agregas las variables

{
  "courseTopic":  "Typescript"
}

tambien se pueden fragmentar cosas por ejemplo el id con el tema como se muestra abajo

query getCoursesFracments($courseId: Int!, 
												$courseId2:Int!){
                          course1:course(id: $courseId){
                            ...courseFields
                          }
                          course2:course(id: $courseId2){
                            ...courseFields
                          }
                        }
  fragment courseFields on Course{
    title
    author
    description
    topic
    url
  }

tambien se puede traer uncurso por ID 

query getSingleCourse($courseID: Int!) {
  course(id: $courseID) {
    title
    author
    topic
    url
  }
}

variables

{
  "courseID":5
}
