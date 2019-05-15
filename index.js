const express = require('express');//con esto iniciamos express
const app = express(); //se inicializa el codigo de express con una constante como aqui se muestra
const express_graphql = require('express-graphql');//el conector de graphql y express
const { buildSchema } = require('graphql');// para hacer las consultas de grapqul

//data
const { courses }= require('./data.json'); //para np pner courses.courses se pone { courses }
//console.log(courses);

//el type course es definir el esquema de los datos que vas a ocuapar al hace la consulta ala bd
//la parte de los qwerys tu agregas los tipos de consultas que vas hacer
const schema = buildSchema(`
    type Query{
        course(id:Int!):Course
        courses(topic:String):[Course]
    }

    type Mutation{
        updateCourseTopic(id: Int!, topic:String!):Course

    }
    type Course{
        id:Int
        title:String
        description:String
        author:String
        topic:String
        url:String
    }

`);

//lo de la mutation
let updateCourseTopic = ({id, topic}) =>{
    courses.map(course => {
        if (course.id === id ){
            course.topic = topic;
            return course;
        }
    })
    return courses.filter(course => course.id === id)[0]
}

//la parte de argumentos
let getCourse = (args) =>{ //definimos una funcion para obtener el curso
    let id = args.id;
    return courses.filter(course => {
        return course.id == id;
    })[0]// con el corchete cero solo te da el primer 0 o el primer dato del id
}
let getCourses = (args) =>{
    if(args.topic){
        let topic = args.topic;
        return courses.filter(course => course.topic === topic);
    }else if(args.topic){
        let topic =! args.topic;
        return console.log('no se encontro el libro que mencionas')
    } 
};
const root ={ //este es que es lo que puede consultar
    course:getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
}
app.use('/graphql',express_graphql({
    schema:schema,
    rootValue: root,
    graphiql: true //con este agregas la interfas del esquema de grapql... el postman
}));


app.listen(3000, () => console.log('server on port 3000'));//creamos el puerto 3000

