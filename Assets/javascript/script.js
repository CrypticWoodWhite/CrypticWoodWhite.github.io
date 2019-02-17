$(".post-images").on("click", function(event) {
    event.preventDefault();
    if ($(this).siblings("p").hasClass("hide")) {
        $(this).siblings("p").removeClass("hide");
        $(this).siblings("p").addClass("show");
    }
    else if ($(this).siblings("p").hasClass("show")) {
        $(this).siblings("p").removeClass("show");
        $(this).siblings("p").addClass("hide");
    } 
})