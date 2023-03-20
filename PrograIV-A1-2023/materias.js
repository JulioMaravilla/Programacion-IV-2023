Vue.component('v-select-docentes', VueSelect.VueSelect);
Vue.component('component-materias',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            materias: [],
            docentes : [],
            materia:{
                idMateria  : '',
                codigo     : '',
                nombre     : '',
                docente    : {
                    id    : '',
                    label : ''
                },
            }
        }
    },
    methods:{
        guardarMateria(){
            this.listar();
            if(this.accion==='nuevo'){
                this.materia.idMateria = new Date().getTime().toString(16);
                this.materias.push( JSON.parse( JSON.stringify(this.materia) ) );
            }else if(this.accion==='modificar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias[index] = JSON.parse( JSON.stringify(this.materia) );
            }else if(this.accion==='eliminar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias.splice(index,1);
            }
            localStorage.setItem("materias", JSON.stringify(this.materias) );
            fetch(`private/modulos/materias/materias.php?accion=${this.accion}&materias=${JSON.stringify(this.materia)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoMateria();
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar a ${materia.nombre}?`) ){
                this.accion='eliminar';
                this.materia=materia;
                this.guardarMateria();
            }
        },
        nuevoMateria(){
            this.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo= '';
            this.materia.nombre = '';
            this.materia.docente.id = '';
            this.materia.docente.label = '';
        },
        modificarMateria(materia){
            this.accion = 'modificar';
            this.materia = materia;
        },
        listar(){
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" )
                .filter(materia=>materia.docente.label.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ||
                    materia.nombre.indexOf(this.buscar)>-1);
            this.docentes = JSON.parse( localStorage.getItem('docentes') || "[]" ).map(docente=>{
                return { 
                    id: docente.idDocente,
                    label : docente.nombre
                }
            });
            if( this.materias.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/materias/materias.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.materias = resp;
                    localStorage.setItem("materias", JSON.stringify(this.materias) );
                });
            }
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATRICULA</div>
                    <div class="card-body">
                        <form id="frmMateria" @reset.prevent="nuevoMateria" v-on:submit.prevent="guardarMateria">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>CODIGO MATERIA:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de materia de 3 digitos"
                                            v-model="materia.codigo" type="text" class="form-control" name="txtCodigoMateria" id="txtCodigoMateria">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col col-md-2">NOMBRE MATERIA:</div>
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
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMateria">DOCENTE:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                    <v-select-docentes required v-model="materia.docente" :options="docentes" ></v-select-docentes>
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
                    <div class="card-header">LISTADO DE MATRICULAS</div>
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
                                    <th colspan="3">Docente</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="materia in materias" :key="materia.idMateria" @click="modificarMateria(materia)" >
                                    <td>{{ materia.codigo }}</td> 
                                    <td>{{ materia.nombre }}</td>
                                    <td>{{ materia.docente.label }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarMateria(materia)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});
