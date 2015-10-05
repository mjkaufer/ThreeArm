var geometry = new THREE.SphereGeometry( 2, 10, 10 );
var lineMaterial = new THREE.LineBasicMaterial({
	color: new THREE.Color().setHSL(0, 0.5, 0.5),
	linewidth: 20
});
var material = new THREE.MeshBasicMaterial({
	color: new THREE.Color().setHSL(0.5, 0.5, 0.5)
});

var groupPointObject = stationaryPhysiBall()

function stationaryPhysiBall(){
	var ball = new Physijs.SphereMesh(geometry, material)
	ball.__dirtyPosition = true;
	ball.mass = 0
	return ball
}

function physiGroup(){
	var emptyGeo = new THREE.BoxGeometry(1, 1, 1)

	var emptyMaterial = new THREE.Material()

	// return new Physijs.BoxMesh(emptyGeo, emptyMaterial)
	// return ballGroup()
	return stationaryPhysiBall()
}

function updateColors(dh){
	material.color.offsetHSL(dh, 0, 0)
	lineMaterial.color.offsetHSL(dh, 0, 0)
}

function ballGroup(){//balls are at centers of group, and show where the group pivots
	// var group = new THREE.Object3D();
	
	var group = physiGroup();

	var ball = stationaryPhysiBall()
	ball.position.set(globalPosition(group))
	ball.parentGroup = group


	// group.add(ball)
	// return ball;
	groupPointObject.add(ball)


	return group;
}

function updateGroupPoints(){
	for(var i = 0; i < groupPointObject.children.length; i++){
		var groupPoint = groupPointObject.children[i]
		groupPoint.position.copy(globalPosition(groupPoint.parentGroup))
	}
}

function lineTo(startVector, endVector){
	var lineGeo = new THREE.Geometry()
	lineGeo.vertices.push(startVector)
	lineGeo.vertices.push(endVector)
	return new THREE.Line(lineGeo, lineMaterial)
}

function xzVector(magnitude, angle){
	return new THREE.Vector3(Math.cos(angle) * magnitude, 0, Math.sin(angle) * magnitude)
}

function globalPosition(obj){
	return obj.position.clone().applyMatrix4(obj.matrixWorld)
}