<?php
include '../../Config/Config.php';
extract($_REQUEST);

$materias = isset($materias) ? $materias : '[]';
$accion = isset($accion) ? $accion : '';
$json_datos = json_encode($datos);
$class_materia = new Materia($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_materia->consultar('')));
}else{
    print_r($class_materia->recibir_datos($materias));
}
class Materia{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($materia){
        $this->datos = json_decode($materia, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idMateria'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['codigo'])){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty($this->datos['nombre'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if(empty($this->datos['docente'])){
            $this->respuesta['msg'] = 'Por favor selecciones un docente';
        }
        return $this->administrar_materia();
    }
    private function administrar_materia(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                $docente = json_encode($this->datos['docente']['label']);
                return $this->db->consultas(
                    'INSERT INTO materias VALUES(?,?,?,?)',
                    $this->datos['idMateria'], $this->datos['codigo'], $this->datos['nombre'],
                    $docente/*$this->datos['docente']['label']*/
                );
            }else if($accion=='modificar'){
                $docente = json_encode($this->datos['docente']['label']);
                return $this->db->consultas(
                    'UPDATE materias SET codigo=?, nombre=?, docente=? WHERE idMateria=?',
                    $this->datos['codigo'], $this->datos['nombre'],$docente,
                    $this->datos['idMateria']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE materias FROM materias WHERE idMateria=?', 
                    $this->datos['idMateria']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM materias');
        return $this->db->obtener_datos();
    }
}
?>