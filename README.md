# Vimipi

>En este Proyecto se creara una App de **almacenamiento de archivo en la nube**

## Objetivos
 > Se creara el **Back-end** y el **Front-end** para desarrollar dicha App, la cual subira, listara los archivos y permitira descargarlos, se  hara mediante TDD

 
## FRONT-END 
### Se realizara con:

- **Javascript** - `Lenguaje de programacion para crear paginas web interactivas`
- **Typescript** - `Da tipado estatico a javascript`
- **Vite** - `Herramienta de construccion de frontend`
- **Vitest** - `Framework nativo de vite para construir TEST`
- **React** - `Crear interfaces de usuarios`
- **TailwindCSS** - `Framework para CSS`
- **Formik** - `Libreria declarativa para manejar validacion de formularios`
- **Yup** - `Esquemas que permiten validaciones complejas`
- **Zustand** - `Manejador de estado global - Mucho mas Facil que ***Redux-Toolkit***`
- **Ts-Standard** - `Reglas para formatear el codigo`

## BACK-END 
### Se realizara con:

- **Javascript** - `Lenguaje de programacion para crear paginas web interactivas`
- **Typescript** - `Da tipado estatico a javascript`
- **Express** - `Framework que permite desarrollar un servidor web`
- **Sequelize** - `ORM para modelar base de datos, en este caso con Postgres`
- **Postgres** - `Gestor de DB relacionales`
- **MVC** - `Arquitectura de software para separar codigo por responsabilidades`


#### Definiendo Rutas

 - **/upload** - `Para subir los archivos`
 - **/files** - `Trae todos los archivos`
 
#### Definiendo la DB
 
<!DOCTYPE html>
<html>
  <head>
    <style>
      table {
        width: 10%;
        border-collapse: collapse;
        border: 1px solid black;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
      }
    </style>
  </head>
  <body>

  <table>
    <tr>
      <th >Files</th>
    </tr>
    <tr>
      <td>* ID</td>
    </tr>
    <tr>
      <td>name</td>
    </tr>
    <tr>
      <td>type</td>
    </tr>
    <tr>
      <td>size</td>
    </tr>
  </table>
  </body>
</html>
