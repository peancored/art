var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000000 );
  camera.position.set( 0, 0, 1000 );

  scene = new THREE.Scene();

  var colorArray = [ new THREE.Color( 0xff0080 ), new THREE.Color( 0xffffff ), new THREE.Color( 0x8000ff ) ];
  var positions = [];
  var colors = [];

  for ( var i = 0; i < 1000000; i ++ ) {

    positions.push( 4000 * ( Math.random() - 0.5 ), 4000 * ( Math.random() - 0.5 ), 4000 * ( Math.random() - 0.5 ) );

    var clr = colorArray[ Math.floor( Math.random() * colorArray.length ) ];

    colors.push( clr.r, clr.g, clr.b );

  }

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
  geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

  var material = new THREE.PointsMaterial( { size: 4, vertexColors: THREE.VertexColors, depthTest: false, sizeAttenuation: false } );

  var mesh = new THREE.Points( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClearColor = false;
  container.appendChild( renderer.domElement );

  stats = new Stats();
  container.appendChild( stats.dom );

  //

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 1000;
  mouseY = ( event.clientY - windowHalfY ) * 1000;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();
  stats.update();

}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  renderer.render( scene, camera );

}
