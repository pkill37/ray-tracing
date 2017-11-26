function intersectSphere(sphereCenter, sphereRadius, rayStart, rayDirection) {
    var rayToCenter = subtract(sphereCenter, rayStart)
    var sideLength = dotProduct(rayToCenter, rayDirection)

    var rayToCenterLength = dotProduct(rayToCenter, rayToCenter)
    var discriminant = (sphereRadius * sphereRadius) - rayToCenterLength + (sideLength * sideLength)
    /*
    console.log('ray to center', rayToCenter)
    console.log('distance to sphere', sideLength)
    console.log('discriminant', discriminant)
    */

    if (discriminant < 0) {
        return false
        //return -1;
    } else {
        return true
        //return sideLength - Math.sqrt(discriminant);
    }
}

// Compute reflection r = i - 2(i.n)n
function reflect(i, n) {
    return subtract(i, multiplyVectorByScalar(2*dotProduct(i, n), n))
}

function raycast(ray, direction, depth, objects, rays) {
    for (let obj of objects) {
        let i = intersectSphere(obj.center, obj.radius, ray, direction)

        if (i) {
            console.log('Ray '+ ray+ ' with direction '+ direction+ ' intersected sphere of radius '+ obj.radius+ ' centered at '+ obj.center)
            rays.push([ray, obj.center])

            let incident = add(ray, direction)
            let intersection = null
            //let normal = subtract(intersection, obj.center)
            //let reflection = reflect(incident, normal)
            //return raycast(intersection, reflection, depth-1, objects, rays)
        }
    }
}

