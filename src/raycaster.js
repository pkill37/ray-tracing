function intersect(rayStart, rayDirection, object) {
    if (object instanceof Sphere) return intersectSphere(rayStart, rayDirection, object.center, object.radius)
    else if (object instanceof Floor) return intersectPlane(rayStart, rayDirection, object.point, object.normal)
}

function intersectPlane(o, d, p, n) {
    let denom = dotProduct(d, n)
    if (Math.abs(denom) < 1e-6) {
        return Infinity
    }

    let dist = dotProduct(subtract(p, o), n) / denom
    if (dist < 0) {
        return Infinity
    }
    return dist
}

function intersectSphere(o, d, s, r) {
    let a = dotProduct(d, d)
    let os = subtract(o, s)
    let b = 2   * dotProduct(d, os)
    let c = dotProduct(os, os) - r*r
    let disc = b*b - 4*a*c
    if (disc > 0) {
        let distSqrt = Math.sqrt(disc)
        let q = (b < 0) ? (-b - distSqrt) / 2.0 : (-b + distSqrt) / 2.0

        let t0 = q / a
        let t1 = c / q
        t0 = Math.min(t0, t1)
        t1 = Math.max(t0, t1)
        if (t1 >= 0) {
            return (t0 < 0) ? t1 : t0
        }
    }
    return Infinity
}

// Compute reflection r = i - 2(i.n)n
function reflect(i, n) {
    return subtract(i, multiplyVectorByScalar(n, 2*dotProduct(i, n)) )
}

function raycast(ray, direction, depth, objects, primaryRays, shadowRays, lastRay = null) {
    if (depth === 0) return false

    let foundIntersectionFlag = false;

    for (let obj of objects) {
        let t = intersect(ray, direction, obj)
        if (t !== Infinity) {
            foundIntersectionFlag = true;
            console.log('Ray', ray, direction, ' intersected ', obj, ' distanced ', t)

            let incident = multiplyVectorByScalar(direction, t)
            console.log("incident", incident)

            let intersection = add(ray, incident)
            console.log("intersection", intersection)

            let normal = (obj instanceof Floor) ? obj.normal : normalizeRet(subtract( intersection, obj.center))
            console.log("normal", normal)

            let reflection = reflect(incident, normal)
            console.log("reflection", reflection)

            let away = add(intersection,reflection)
            console.log("away", away)

            primaryRays.push([ray, intersection])
            lastRay = [intersection, away]
            //primaryRays.push([intersection, add(normal,intersection)])

            return raycast(intersection, reflection, depth-1, objects, primaryRays, shadowRays, lastRay)
        } else {
            console.log('not intersected')
        }
    }
    if(! foundIntersectionFlag ){
        if( lastRay != null){
            primaryRays.push(lastRay)
            return true
        }
        else{
            primaryRays.push([ray,multiplyVectorByScalar(direction,10)])
            return true
        }
    }
    return false

}

