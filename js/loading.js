/* 
another method for detecting the new elements attached.
document.body.addEventListener('DOMNodeInserted', function(event){
    console.log(event);
}, false); 
*/
var commonLoadingElements = '<div class="loading-ani">' +
                                '<div class="scale-one">' +
                                    '<div class="rot-one">' +
                                        '<div class="dot ani-dotone"></div>' +
                                        '<div class="dot ani-dottwo"></div>' +
                                        '<div class="dot ani-dotthree"></div>' +
                                        '<div class="dot ani-dotfour"></div>' +
                                        '<div class="line ani-lineone"></div>' +
                                        '<div class="line ani-linetwo"></div>' +
                                        '<div class="line ani-linethree"></div>' +
                                        '<div class="line ani-linefour"></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="scale-two">' +
                                    '<div class="rot-two">' +
                                        '<div class="dot ani-dotfive"></div>' +
                                        '<div class="dot ani-dotsix"></div>' +
                                        '<div class="dot ani-dotseven"></div>' +
                                        '<div class="dot ani-doteight"></div>' +
                                        '<div class="line ani-linefive"></div>' +
                                        '<div class="line ani-linesix"></div>' +
                                        '<div class="line ani-lineseven"></div>' +
                                        '<div class="line ani-lineeight"></div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="line ani-linenine"></div>' +
                                '<div class="line ani-lineten"></div>' +
                                '<div class="line ani-lineeleven"></div>' +
                                '<div class="line ani-linetwelve"></div>' +
                            '</div>' +
                        '</div>';
var loadingElements = '<div class="loading-container">' + commonLoadingElements;
var bodyLoadingElements = '<div id="body-loading" class="loading-container">' + commonLoadingElements;
if($('body').hasClass("loading")){
    $('body').prepend(bodyLoadingElements);
}
$(window).on("load", function(){
    $("#body-loading").animate({opacity: 0}, 1000, "linear", function(){
        this.remove();
    });
});
var loading = () => {
    var mutationObserver = new MutationObserver(function(mutations, observer){
        mutations.forEach(function(mutation) {
            let target = mutation.addedNodes[0];
            if(target != undefined && target.classList != undefined){
                if(target.classList.contains("loading")){
                    $(target).prepend(loadingElements);
                    $(target).children("img").on("load", function(){
                        $(target).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                            $(target).children("img").off();
                            $(this).remove();
                        });
                    });
                    let video = $(target).children("video").get(0);
                    let removeLoading = () => {
                        $(target).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                            video.removeEventListener("canplay", removeLoading);
                            $(this).remove();
                        });
                    };
                    if(video != undefined){
                        video.addEventListener("canplay", removeLoading);
                    }
                };
            };
        });
    });
    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}