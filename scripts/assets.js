// Road assets source
const roadImagePath = "assets/Road";

// ~ Road
var img_tStraightRoad = new Image(); img_tStraightRoad.src = roadImagePath + "/Straight/Road-Straight-Top.png";
var img_bStraightRoad = new Image(); img_bStraightRoad.src = roadImagePath + "/Straight/Road-Straight-Bottom.png";
var img_rStraightRoad = new Image(); img_rStraightRoad.src = roadImagePath + "/Straight/Road-Straight-Right.png";
var img_lStraightRoad = new Image(); img_lStraightRoad.src = roadImagePath + "/Straight/Road-Straight-Left.png";

// ~ Corner
var img_rCornerRoad = new Image(); img_rCornerRoad.src = roadImagePath + "/Corner/Road-Corner-Right.png";
var img_lCornerRoad = new Image(); img_lCornerRoad.src = roadImagePath + "/Corner/Road-Corner-Left.png";

// ~ Intersection
var img_trInterRoad = new Image(); img_trInterRoad.src = roadImagePath + "/Intersection/Road-Intersection-Top-Right.png";
var img_tlInterRoad = new Image(); img_tlInterRoad.src = roadImagePath + "/Intersection/Road-Intersection-Top-Left.png";
var img_brInterRoad = new Image(); img_brInterRoad.src = roadImagePath + "/Intersection/Road-Intersection-Bottom-Right.png";
var img_blInterRoad = new Image(); img_blInterRoad.src = roadImagePath + "/Intersection/Road-Intersection-Bottom-Left.png";


// Building assets source
const buildingImagePath = "assets/Building";

// ~ Building Large
var img_lBuildU = new Image(); img_lBuildU.src = buildingImagePath + "/Building-Large/Building-Large-Up.png";
var img_lBuildD = new Image(); img_lBuildD.src = buildingImagePath + "/Building-Large/Building-Large-Down.png";
var img_lBuildR = new Image(); img_lBuildR.src = buildingImagePath + "/Building-Large/Building-Large-Right.png";
var img_lBuildL = new Image(); img_lBuildL.src = buildingImagePath + "/Building-Large/Building-Large-Left.png";

// ~ Builiding Medium
var img_mBuildU = new Image(); img_mBuildU.src = buildingImagePath + "/Building-Medium/Building-Medium-Up.png";
var img_mBuildD = new Image(); img_mBuildD.src = buildingImagePath + "/Building-Medium/Building-Medium-Down.png";
var img_mBuildR = new Image(); img_mBuildR.src = buildingImagePath + "/Building-Medium/Building-Medium-Right.png";
var img_mBuildL = new Image(); img_mBuildL.src = buildingImagePath + "/Building-Medium/Building-Medium-Left.png";

// ~ Small Building
var img_sBuildU = new Image(); img_sBuildU.src = buildingImagePath + "/Building-Small/Building-Small-Up.png";
var img_sBuildD = new Image(); img_sBuildD.src = buildingImagePath + "/Building-Small/Building-Small-Down.png";
var img_sBuildR = new Image(); img_sBuildR.src = buildingImagePath + "/Building-Small/Building-Small-Right.png";
var img_sBuildL = new Image(); img_sBuildL.src = buildingImagePath + "/Building-Small/Building-Small-Left.png";

// ~ House Building
var img_hBuildU = new Image(); img_hBuildU.src = buildingImagePath + "/Building-House/Building-House-Up.png";
var img_hBuildD = new Image(); img_hBuildD.src = buildingImagePath + "/Building-House/Building-House-Down.png";
var img_hBuildR = new Image(); img_hBuildR.src = buildingImagePath + "/Building-House/Building-House-Right.png";
var img_hBuildL = new Image(); img_hBuildL.src = buildingImagePath + "/Building-House/Building-House-Left.png";

// Asset property
const padding = 10;
const roadPad = 20;
const areaPad = roadPad + padding;

var road = {
    straight: {
        top: img_tStraightRoad,
        bottom: img_bStraightRoad,
        right: img_rStraightRoad,
        left: img_lStraightRoad
    },

    inter: {
        top: {
            right: img_trInterRoad,
            left: img_tlInterRoad
        },
        bottom: {
            right: img_brInterRoad,
            left: img_blInterRoad
        }
    },

    corner: {
        right: img_rCornerRoad,
        left: img_lCornerRoad
    }
}

var building = {
    large: {
        up: img_lBuildU,
        down: img_lBuildD,
        right: img_lBuildR,
        left: img_lBuildL,
        w: 200,
        h: 100
    },

    medium: {
        up: img_mBuildU,
        down: img_mBuildD,
        right: img_mBuildR,
        left: img_mBuildL,
        w: 100,
        h: 72
    },

    small: {
        up: img_sBuildU,
        down: img_sBuildD,
        right: img_sBuildR,
        left: img_sBuildL,
        w: 40,
        h: 54
    },

    house: {
        up: img_hBuildU,
        down: img_hBuildD,
        right: img_hBuildR,
        left: img_hBuildL,
        w: 40,
        h: 34
    }
}

var buildIdx = [building.large, building.medium, building.small, building.house];