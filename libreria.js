Swal.fire({
    title: "¿Acepta nuestros terminos y condiciones?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, acepto."
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Excelente podés continuar",
        text: "Su archivo ha sido eliminado.",
        icon: "success"
      });
    }
  });