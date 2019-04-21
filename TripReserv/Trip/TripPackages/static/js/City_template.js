    // Add minus icon for collapse element which is open by default
    $(".collapse.in").each(function(){
        $(this).siblings(".panel-heading").find(".fas").addClass("fa-minus").removeClass("fa-plus");
    });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).parent().find(".fas").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).parent().find(".fas").removeClass("fa-minus").addClass("fa-plus");
    });


    $(".link").click(function () {

        $(this).siblings(".hide").slideToggle(1000);

        var linktext = $(this).html();
        if(linktext == "Show more")
            $(this).html("Show less");
        else
            $(this).html("Show more");
    })
  