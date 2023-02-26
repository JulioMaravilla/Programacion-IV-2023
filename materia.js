Vue.component('v-select-docente',VueSelect.VueSelect);
Vue.component('component-materia',{
    data:()=>{
        return {
            buscar:'',
            materias:[],
            materia:{
                accion : 'nuevo',
                idMateria : '',
                codigo: '',
                nombre:'',
                fecha:'',
            }
        }
    },
    methods:{
        buscandoMateria(){
            this.obtenerMaterias(this.buscar);
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar el materia ${materia.nombre}?`) ){
                this.materia.accion = 'eliminar';
                this.materia.idMateria = materia.idMateria;
                this.guardarMateria();
            }
            this.nuevoMateria();
        },
        modificarMateria(datos){
            this.materia = JSON.parse(JSON.stringify(datos));
            this.materia.accion = 'modificar';
        },
        guardarMateria(){
            this.obtenerMaterias();
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            if(this.materia.accion=="nuevo"){
                this.materia.idMateria = generarIdUnicoFecha();
                materias.push(this.materia);
            } else if(this.materia.accion=="modificar"){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias[index] = this.materia;
            } else if( this.materia.accion=="eliminar" ){
                let index = materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                materias.splice(index,1);
            }
            localStorage.setItem('materias', JSON.stringify(materias));
            this.nuevoMateria();
            this.obtenerMaterias();
            this.materia.msg = 'Materia procesado con exito';
        },
        obtenerMaterias(valor=''){
            this.materias = [];
            let materias = JSON.parse(localStorage.getItem('materias')) || [];
            this.materias = materias.filter(materia=>materia.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1 ||
                                        materia.codigo.indexOf(this.buscar)>-1);
             
            //aqui vemos las docentes 
            this.docentes = [];
            let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
            this.docentes = docentes.map(docente=>{
                return {
                    //id: docente.idCategoria,
                    label: docente.nombre,
                }
            });
        },
        nuevoMateria(){
            this.materia.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.nombre='';
            this.materia.fecha='';
            
        }
    },
    created(){
        this.obtenerMaterias();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carMateria">
                <div class="card-header bg-primary">
                    Registro de Materias
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carMateria" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarMateria" @reset="nuevoMateria">
                        
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo-Materia:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo de materia ejemplo:SM2345" v-model="materia.codigo" pattern="[A-Z0-9]{6}" required type="text" class="form-control">
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">
                                Docente:
                            </div>
                            <div class="col col-md-3">
                                <v-select-docente v-model="materia.docente" 
                                    :options="docentes" placeholder="Seleccione una docente"/>
                            </div>
                        </div>

                        <div class="row p-1">
                            <div class="col col-md-2">Materia:</div>
                            <div class="col col-md-2">
                                <select title="Seleccione una materia" v-model="materia.nombre" pattern="[0-9]{3,10}" required type="text" class="form-control">
                                <option>Base de Datos 1</option>
                                <option>Base de Datos 2</option>
                                <option>Ingles Basico</option>
                                <option>Programacion Computacional</option>
                                <option>Electronica Analoga</option>
                                <option>Sistemas Operativos</option>
                                <option>Principios de Programacion</option>
                                </select>
                            </div>
                        </div>
                       
                        <div class="row p-1">
                            <div class="col col-md-2">Fecha de Materia:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la fecha" v-model="materia.fecha" pattern="{0000-00-00}" required type="date" class="form-control form-control-sm">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="materia.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ materia.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarMateria">
                <div class="card-header bg-primary">
                    Busqueda de Materias
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarMateria" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoMateria" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>MATERIA</th>
                                <th>DOCENTE</th>
                                <th>FECHA</th>
    
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in materias" @click='modificarMateria( item )' :key="item.idMateria">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.docente.label}}</td>
                                <td>{{item.fecha}}</td>

                                <td>
                                    <button class="btn btn-danger" @click="eliminarMateria(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});