<?php
include '../../Config/Config.php';
extract($_REQUEST);

$matriculas = isset($matriculas) ? $matriculas : '[]';
$accion = isset($accion) ? $accion : '';
$json_datos = json_encode($datos);
$class_matricula = new Matricula($conexion);
if( $accion=='consultar' ){
    print_r(json_encode($class_matricula->consultar('')));
}else{
    print_r($class_matricula->recibir_datos($matriculas));
}
class Matricula{
    private $datos=[], $db, $respuesta=['msg'=>'ok'];

    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($matricula){
        $this->datos = json_decode($matricula, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if(empty($this->datos['idMatricula'])){
            $this->respuesta['msg'] = 'Nose pudo seleccionar el ID';
        }
        if(empty($this->datos['alumno'])){
            $this->respuesta['msg'] = 'Por favor seleccione un estudiante';
        }
        if(empty($this->datos['fecha'])){
            $this->respuesta['msg'] = 'Por favor ingrese la fecha';
        }
        if(empty($this->datos['pago'])){
            $this->respuesta['msg'] = 'Por favor ingrese la fecha';
        }
        return $this->administrar_matricula();
    }
    private function administrar_matricula(){
        global $accion;
        $alumno = json_encode($this->datos['alumno']['label']);
        if( $this->respuesta['msg']=='ok' ){
            if($accion=='nuevo'){
                return $this->db->consultas(
                    'INSERT INTO matriculas VALUES(?,?,?,?)',
                    $this->datos['idMatricula'],$alumno, $this->datos['fecha'],$this->datos['pago'] === 'si' ? 0 : 1
                );                                                                               
                    
            }else if($accion=='modificar'){
                return $this->db->consultas(
                    'UPDATE matriculas SET  alumno=?, fecha=?, pago=? WHERE idMatricula=?',
                    $this->datos['fecha'], $alumno,$this->datos['pago'] === 'si' ? 0 : 1,
                    $this->datos['idMatricula']
                );
            }else if($accion=='eliminar'){
                return $this->db->consultas(
                    'DELETE matriculas FROM matriculas WHERE idMatricula=?',
                    $this->datos['idMatricula']
                );
            }
        }else{
            return $this->respuesta;
        }
    }
    public function consultar(){
        $this->db->consultas('SELECT * FROM matriculas');
        return $this->db->obtener_datos();
    }
}
?>