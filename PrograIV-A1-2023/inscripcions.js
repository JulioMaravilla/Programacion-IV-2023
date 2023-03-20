Vue.component('v-select-materias', VueSelect.VueSelect);
Vue.component('v-select-alumnos', VueSelect.VueSelect);
Vue.component('component-inscripcions',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            inscripcions: [],
            materias : [],
            alumnos :[],
            inscripcion:{
                idInscripcion  : '',
                codigo     : '',
                fecha      :'',
                materia    : {
                    id    : '',
                    label : ''
                },
                alumno     :{
                    id     : '',
                    label  : ''
                },
            }
        }
    },
    methods:{
        guardarInscripcion(){
            this.listar();
            if(this.accion==='nuevo'){
                this.inscripcion.idInscripcion = new Date().getTime().toString(16);
                this.inscripcions.push( JSON.parse( JSON.stringify(this.inscripcion) ) );
            }else if(this.accion==='modificar'){
                let index = this.inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripcions[index] = JSON.parse( JSON.stringify(this.inscripcion) );
            }else if(this.accion==='eliminar'){
                let index = this.inscripcions.findIndex(inscripcion=>inscripcion.idInscripcion==this.inscripcion.idInscripcion);
                this.inscripcions.splice(index,1);
            }
            localStorage.setItem("inscripcions", JSON.stringify(this.inscripcions) );
            fetch(`private/modulos/inscripcions/inscripcions.php?accion=${this.accion}&inscripcions=${JSON.stringify(this.inscripcion)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoInscripcion();
        },
        eliminarInscripcion(inscripcion){
            if( confirm(`Esta seguro de eliminar a ${inscripcion.codigo}?`) ){
                this.accion='eliminar';
                this.inscripcion=inscripcion;
                this.guardarInscripcion();
            }
        },
        nuevoInscripcion(){
            this.accion = 'nuevo';
            this.inscripcion.idInscripcion = '';
            this.inscripcion.codigo= '';
            this.inscripcion.alumno.id = '';
            this.inscripcion.alumno.label='';
            this.inscripcion.materia.id = '';
            this.inscripcion.materia.label = '';
            this.inscripcion.fecha='';
        },
        modificarInscripcion(inscripcion){
            this.accion = 'modificar';
            this.inscripcion = inscripcion;
        },
        listar(){
            this.inscripcions = JSON.parse( localStorage.getItem('inscripcions') || "[]" )
                .filter(inscripcion=>inscripcion.alumno.label.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                    inscripcion.codigo.indexOf(this.buscar)>-1);
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" ).map(materia=>{
                return { 
                    id: materia.idMateria,
                    label : materia.nombre
                }
            }),
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" ).map(alumno=>{
                return { 
                    id: alumno.idAlumno,
                    label : alumno.nombre
                }
            });
            if( this.inscripcions.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/inscripcions/inscripcions.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.inscripcions = resp;
                    localStorage.setItem("inscripcions", JSON.stringify(this.inscripcions) );
                });
            }
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">REGISTRO DE INSCRIPCION</div>
                    <div class="card-body">
                        <form id="frmInscripcion" @reset.prevent="nuevoInscripcion" v-on:submit.prevent="guardarInscripcion">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>Inscripcion Codigo:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de Inscripcion de 3 digitos"
                                            v-model="inscripcion.codigo" type="text" class="form-control" name="txtCodigoInscripcion" id="txtCodigoInscripcion">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Alumno:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-alumnos required v-model="inscripcion.alumno" :options="alumnos" ></v-select-alumnos>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 1:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materia" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 2:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiados" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 3:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiatres" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 4:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiacuatro" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoInscripcion">Materia 5:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-materias required v-model="inscripcion.materiacinco" :options="materias" ></v-select-materias>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>Fecha:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input required v-model="inscripcion.fecha" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">LISTADO DE INSCRIPCION</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="3"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th colspan="3">Materia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="inscripcion in inscripcions" :key="inscripcion.idInscripcion" @click="modificarInscripcion(inscripcion)" >
                                    <td>{{ inscripcion.codigo }}</td> 
                                    <td>{{ inscripcion.alumno.label }}</td>
                                    <td>{{ inscripcion.materia.label }}</td>
                                    <td>{{ inscripcion.materiados.label }}</td>
                                    <td>{{ inscripcion.materiatres.label }}</td>
                                    <td>{{ inscripcion.materiacuatro.label }}</td>
                                    <td>{{ inscripcion.materiacinco.label }}</td>
                                    <td>{{ inscripcion.fecha }}</td> 
                                    <td><button class="btn btn-danger" @click="eliminarInscripcion(inscripcion)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});
