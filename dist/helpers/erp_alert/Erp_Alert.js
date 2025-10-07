import Swal from 'sweetalert2';
const Erp_Alert = (title, text = '', icon = 'success', timer = 2000) => {
    Swal.fire({
        title,
        text,
        icon,
        timer,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
        customClass: {
            container: 'swal2-container-top-end',
        },
    });
};
export default Erp_Alert;
