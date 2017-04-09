$(document).ready(function(){
    $("#show-calendar").click(function(){
        $("#calendar").toggle();
    });
    $('#show-shablon').click(function() {
    	$('.shablon').toggle();
    });

    $('#img-avatar').change(function(event) {
    	var input=$(this)[0];
    	if (input.files && input.files[0]) {
					if (input.files[0].type.match('image/.*')) {
						var reader = new FileReader();
						reader.onload = function(e) {
							$('#img-preview').attr('src', e.target.result);
						}
						reader.readAsDataURL(input.files[0]);
					} else {
						console.log('ошибка, не изображение');
					}
				} else {
					console.log('хьюстон у нас проблема');
				}
			});
	$('#form-avatar').change('reset', function() {
				$('#img-preview').attr('src', 'default-preview.jpg');
			});

    });
