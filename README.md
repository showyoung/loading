# loading
simple loading interface
when html add new elements into itself,we can add class="loading" to use loading screen.
example:
image:
<div class="loading">
  <img src="a.png" />
</div>
OR
video:
<div class="loading">
  <video poster="b.png">
    <source src="b.mp4" />
  </video>
</div>
OR
audio:
<div class="loading">
  <audio src="c.mp3"></audio>
  <img class="poster" src="c.png" />
</div>
OR
iframe:
<div class="loading">
  <iframe src="d.html"></iframe>
</div>
