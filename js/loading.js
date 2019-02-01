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
        mutations.forEach(function(mutation){
            var target = mutation.addedNodes[0];
            if(target != undefined && target.classList != undefined){
                if(target.classList.contains("loading") || $(target).find(".loading").length > 0){
                    if(target.classList.contains("loading")){
                        var loadingTarget = target;
                    }else{
                        var loadingTarget = $(target).find(".loading").get(0);
                    };
                    $(loadingTarget).prepend(loadingElements);
                    if($(loadingTarget).children("audio").length == 0 && $(loadingTarget).children("video").length == 0 && $(loadingTarget).children("img").length > 0){
                        $(loadingTarget).children("img").on("load", function(){
                            $(loadingTarget).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                                $(loadingTarget).children("img").off();
                                $(this).remove();
                            });
                        });
                    };
                    if($(loadingTarget).children("video").length > 0){
                        var video = $(loadingTarget).children("video").get(0);
                        var removeVideoLoading = () => {
                            $(loadingTarget).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                                video.removeEventListener("canplay", removeVideoLoading);
                                $(this).remove();
                            });
                        };
                        if(video != undefined){
                            video.addEventListener("canplay", removeVideoLoading);
                        };
                    };
                    if($(loadingTarget).children("audio").length > 0){
                        var audio = $(loadingTarget).children("audio").get(0);
                        var removeAudioLoading = () => {
                            $(loadingTarget).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                                audio.removeEventListener("canplay", removeAudioLoading);
                                $(this).remove();
                            });
                        };
                        if(audio != undefined){
                            audio.addEventListener("canplay", removeAudioLoading);
                        };
                    };
                    if($(loadingTarget).children("iframe").length > 0){
                        $(loadingTarget).children("iframe").on("load", function(){
                            $(loadingTarget).children(".loading-container").animate({opacity: 0}, 1000, "linear", function(){
                                $(loadingTarget).children("iframe").off();
                                $(this).remove();
                            });
                        });
                    };
                };
            };
        });
    });
    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}