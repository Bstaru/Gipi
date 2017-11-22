(function(){
  'use strict';
  
  var tau = Math.PI * 2;
  var width, height;
  var scene, camera, renderer, pointCloud;
  
  function onDocumentReady(){
    initialize();
    
    /* DO STUFF! */
    var material = new THREE.PointCloudMaterial({
      size: 5,
      vertexColors: THREE.VertexColors
    });
    
    var geometry = new THREE.Geometry();
    var x, y, z;
    _.times(1000, function(n){
      x = (Math.random() * 800) - 400;
      y = (Math.random() * 800) - 400;
      z = (Math.random() * 800) - 400;
      
      geometry.vertices.push(new THREE.Vector3(x, y, z));
      geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
    });
    
    var pointCloud = new THREE.PointCloud(geometry, material);
    scene.add(pointCloud);
    
    function render(){
      window.requestAnimationFrame(render);
      
      _.forEach(geometry.vertices, function(particle, index){
        var dX, dY, dZ;
        dX = Math.random() * 2 - 1;
        dY = Math.random() * 2 - 1;
        dZ = Math.random() * 2 - 1;
        
        particle.add(new THREE.Vector3(dX, dY, dZ));
        geometry.colors[index] = new THREE.Color(Math.random(), Math.random(), Math.random());
      });
      geometry.verticesNeedUpdate = true;
      geometry.colorsNeedUpdate = true;
      
      renderer.render(scene, camera);
    }
    
    render();
  }
  
  function initialize(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(120, 16 / 9, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
  } 
  
  function onWindowResize(){
    width = window.innerWidth;
    height = window.innerHeight;
    updateRendererSize();
  }
  
  function updateRendererSize(){
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  
  document.addEventListener('DOMContentLoaded', onDocumentReady);
})();