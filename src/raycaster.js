function intersectSphere(sphereCenter, rayStart, rayDirection) {
    let rayToSphere = subtract(sphereCenter, rayStart)
    let b = dotProduct(rayDirection, rayToSphere)
    let d = b*b - dotProduct(rayToSphere, rayToSphere) + 1.0
    
    let distance = null
    if (d < 0.0) {
        distance = 10000.0
        return false
    }

    distance = b - Math.sqrt(d)
    if (distance < 0.0) {
        distance = 10000.0
        return false
    }

    return true
}

// Compute reflection r = i - 2(i.n)n
function reflect(i, n) {
    return subtract(i, multiplyVectorByScalar(2*dotProduct(i, n), n))
}

function raycast(ray, direction, depth, objects, rays) {
    for (let obj of objects) {
        if (intersectSphere(obj.center, ray, direction)) {
            console.log('Ray', ray, 'with direction', direction, 'intersected sphere centered at', obj.center)
            rays.push([ray, add(ray, direction)])

            let incident = add(ray, direction)
            let intersection = null
            //let normal = subtract(intersection, obj.center)
            //let reflection = reflect(incident, normal)
            //return raycast(intersection, reflection, depth-1, objects, rays)
        }
    }
}

