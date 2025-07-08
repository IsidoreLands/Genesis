<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <title>OODA WIKI | GPGPU Wind Tunnel</title>
    <style> body { margin: 0; overflow: hidden; background: #000; } </style>
</head>
<body>
    <script type="x-shader/x-fragment" id="computeShader">
        uniform float deltaTime;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            vec3 pos = texture2D(positionTexture, uv).xyz;
            
            // Apply a simple, constant velocity moving left
            pos.x -= 0.1 * deltaTime * 15.0;

            // Reset particles that move off-screen
            if (pos.x < -10.0) { 
                pos.x = 10.0;
                // Give it a new random Y position to vary the stream
                pos.y = (rand(uv) - 0.5) * 10.0;
            }

            gl_FragColor = vec4(pos, 1.0);
        }
    </script>
    
    <script type="x-shader/x-vertex" id="render_vertex">
        uniform sampler2D positions;
        void main() {
            vec3 pos = texture2D(positions, uv).xyz;
            // Increased point size for visibility
            gl_PointSize = 2.0; 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    </script>
    <script type="x-shader/x-fragment" id="render_fragment">
        void main() {
            // Brighter color for visibility
            gl_FragColor = vec4(0.6, 0.65, 0.7, 0.8); 
        }
    </script>
    
    <script type="importmap">
        { "imports": { "three": "https://unpkg.com/three@0.166.1/build/three.module.js",
                       "three/addons/": "https://unpkg.com/three@0.166.1/examples/jsm/" } }
    </script>
    <script type="module" src="main.js"></script>
</body>
</html>