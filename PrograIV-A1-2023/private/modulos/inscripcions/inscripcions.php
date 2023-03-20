<?php
include '../../Config/Config.php';
extract($_REQUEST);

$inscripcions = isset($inscripcions) ? $inscripcions : '[]';
$accion = isset($accion) ? $accion : '';
$json_datos = json_encode($datos);
$class_inscripcion = new Inscripcion($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_inscripcion->consultar('')));
}else{
    print_r($class_inscripcion->recibir_datos($inscripcions));
}
class Inscripcion{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($inscripcion){
        $this->datos = json_decode($inscripcion, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idInscripcion'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['codigo'])){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if(empty($this->datos['alumno'])){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if(empty($this->datos['materia'])){
            $this->respuesta['msg'] = 'Por favor selecciones un materia';
        }
        if(empty($this->datos['materiados'])){
            $this->respuesta['msg'] = 'Por favor selecciones un materia';
        }
        if(empty($this->datos['materiatres'])){
            $this->respuesta['msg'] = 'Por favor selecciones un materia';
        }
        if(empty($this->datos['materiacuatro'])){
            $this->respuesta['msg'] = 'Por favor selecciones un materia';
        }
        if(empty($this->datos['materiacinco'])){
            $this->respuesta['msg'] = 'Por favor selecciones un materia';
        }
        if(empty($this->datos['fecha'])){
            $this->respuesta['msg'] = 'Por favor ingrese una fecha';
        }
        return $this->administrar_inscripcion();
    }
    private function administrar_inscripcion(){
        global $accion;
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                $alumno= json_encode($this->datos['alumno']['label']);
                $materia = json_encode($this->datos['materia']['label']);
                $materiados = json_encode($this->datos['materiados']['label']);
                $materiatres = json_encode($this->datos['materiatres']['label']);
                $materiacuatro = json_encode($this->datos['materiacuatro']['label']);
                $materiacinco = json_encode($this->datos['materiacinco']['label']);
                return $this->db->consultas(
                    'INSERT INTO inscripcions VALUES(?,?,?,?,?,?,?,?,?)',
                    $this->datos['idInscripcion'], $this->datos['codigo'], $alumno,
                    $materia, $materiados, $materiatres,$materiacuatro,$materiacinco,$this->datos['fecha']/*$this->datos['materia']['label']*/
                );
            }else if($accion=='modificar'){
                $alumno= json_encode($this->datos['alumno']['label']);
                $materia = json_encode($this->datos['materia']['label']);
                $materiados = json_encode($this->datos['materiados']['label']);
                $materiatres = json_encode($this->datos['materiatres']['label']);
                $materiacuatro = json_encode($this->datos['materiacuatro']['label']);
                $materiacinco = json_encode($this->datos['materiacinco']['label']);
                return $this->db->consultas(
                    'UPDATE inscripcions SET codigo=?, alumno=?, materia=?, materiados=?,materiatres=?,
                    materiacuatro=?,materiacinco=?, fecha=? WHERE idInscripcion=?',
                    $this->datos['codigo'], $alumno, $materia, $materiados,$materiatres,$materiacuatro,
                    $materiacinco,$this->datos['fecha'], $this->datos['idInscripcion']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE inscripcions FROM inscripcions WHERE idInscripcion=?', 
                    $this->datos['idInscripcion']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM inscripcions');
        return $this->db->obtener_datos();
    }
}
?>