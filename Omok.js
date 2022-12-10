"use strict";

var canvas;
var gl;

var numVertices  = 8 * 20 * 20;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;

var flag = false;
var HSRflag = true;

var theta = [ 270.0, 0.0, 0.0 ];

var thetaLoc;

var gl;

var n = 0

window.onload = function ()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5,0.5, 0.5, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    render();
}

function colorCube()
{
    quad( 1, 0, 3, 2, 0 );
    quad( 2, 3, 7, 6, 1 );
    quad( 3, 0, 4, 7, 1 );
    quad( 6, 5, 1, 2, 1 );
    quad( 4, 5, 6, 7, 1 );
    quad( 5, 4, 0, 1, 1 );
}

function quad(a, b, c, d, e)
{
    var vertices = [
        vec3( -0.5, -0.5, 0 ),
        vec3( -0.5,  0.5, 0 ),
        vec3(  0.5,  0.5, 0 ),
        vec3(  0.5, -0.5, 0 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

    var vertexColors = [
        [ 102.0 / 255, 51.0 / 255, 0.0, 1 ],
        [ 0.0 / 255, 0.0 / 255, 0.0, 2 ]
    ];

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push( vertexColors[e] );
    }
}

function colorStone(y, x)
{
    make_stone( 1, 0, 3, 2, y, x );
    make_stone( 2, 3, 7, 6, y, x );
    make_stone( 3, 0, 4, 7, y, x );
    make_stone( 6, 5, 1, 2, y, x );
    make_stone( 4, 5, 6, 7, y, x );
    make_stone( 5, 4, 0, 1, y, x );

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5,0.5, 0.5, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");

    document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};

    n = (n == 0 ? 1 : 0);

    render();
}

function make_stone(a, b, c, d, y, x)
{
      var i = -0.5 + 0.05 * y;
      var j = -0.5 + 0.05 * x;
      var stone = [
        vec3( -0.02 + i, -0.02 + j, 0.025),
        vec3( -0.02 + i, 0.02 + j, 0.025),
        vec3( 0.02 + i, 0.02 + j, 0.025),
        vec3( 0.02 + i, -0.02 + j, 0.025),
        vec3( -0.02 + i, -0.02 + j, 0),
        vec3( -0.02 + i, 0.02 + j, 0),
        vec3( 0.02 + i, 0.02 + j, 0),
        vec3( 0.02 + i, -0.02 + j, 0)
      ];

    var vertexColors = [
        [ 0, 0, 0, 1 ],
        [ 1, 1, 1, 1]
    ];

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( stone[indices[i]] );
        colors.push( vertexColors[n] );
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag) theta[axis] += -1.0;
    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, numVertices );

    requestAnimFrame( render );
}
