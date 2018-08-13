# ray-tracing

![](https://i.imgur.com/BOGvcSM.png)

Animation in a WebGL application that dynamically explains and demonstrates the ray tracing algorithm.

- Ray tracing is the state of the art for illumination in computer graphics
- Ray tracing works by tracing a path from an imaginary eye through each pixel in a virtual screen, and calculating the color of the object visible through it.
- Each ray must be tested for intersection with the objects in the scene. Once the nearest object has been identified, the algorithm will estimate the incoming light at the point of intersection, examine the material properties of the object, and combine this information to calculate the final color of the pixel.

## Development

```bash
$ python -m http.server
```
