function init() {
  window.ImageTracer.imageToSVG(
    'panda.jpg',
    function(svgstr){ ImageTracer.appendSVGString( svgstr, 'svgcontainer' ); },
  );
}
