    // Add minus icon for collapse element which is open by default
    $(".collapse.in").each(function(){
        $(this).siblings(".panel-heading").find(".fas").addClass("fa-minus").removeClass("fa-plus");
    });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
        $(this).parent().find(".fas").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function(){
        $(this).parent().find(".fas").removeClass("fa-minus").addClass("fa-plus");

        $(this).find(".content").each(
            function(){
                $(this).slideUp(700);
                var linktext = $(this).parent().find(".link").html();
                console.log(linktext);
                if(linktext == "Show less")
                    $(this).parent().find(".link").html("Show more");
               

            }
        );
    });


    $(".link").click(function () {

        // $(this).siblings(".content").toggleClass("hide",1000);
        $(this).siblings(".content").slideToggle(700);
        var linktext = $(this).html();
        if(linktext == "Show more")
            $(this).html("Show less");
        else
            $(this).html("Show more");
    })
  