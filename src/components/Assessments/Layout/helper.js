import Swal from "sweetalert2"
export default null

export function done_alert(){
    return  Swal.fire({
      title: 'ممتاز !',
      text: "أنهيت الاختبار بنجاح",
      icon: 'success',
      confirmButtonText: 'حسنا',
      width: "400px",  
    })
  }