let ref = 0;
let count = 1;
function resetGlobalVariable() { ref = 0; count = 1; }

function algorithm() {
    resetGlobalVariable();

    // Ukuran random
    let random = function() { return getRandomInt(2, 4) * 100; }
    let vert = [{x:0, y:0}, {x:0, y:0}];
    let list = [];

    while (true) {
        debugger;

        if (vert[0].y > 0 && list[ref][1].y >= canvas.height) {
            console.log("Skip ref", ref, vert[0].y);
            ref = (ref + 1) % list.length;
            if (ref == 0) break;
            vert[1].x = list[ref][0].x;
            vert[0].y = list[ref][1].y;
            continue;
        }
        
        let width = random();
        let height = random();

        vert = (vert[0].y > 0) ? createAreaPlus(list, vert, width, height) : createArea(vert, width, height);
        list.push(vert);
        console.log(count, vert[0], vert[1], "Curr ref", ref);

        if (vert[1].x >= canvas.width) {
            // Titik awal x dan y
            vert = JSON.parse(JSON.stringify(vert));
            console.log(ref, list[ref][0].x);
            vert[1].x = list[ref][0].x;
            vert[0].y = list[ref][1].y;
            console.log(list);
        }

        count++;
    }
}

function createArea(vert, width, height) {
    vert = JSON.parse(JSON.stringify(vert));
    vert[0] = Object.assign({}, { x: vert[1].x, y: vert[0].y });
    
    let targetX = (vert[0].x + width > canvas.width) ? canvas.width : vert[0].x + width;
    let targetY = (vert[0].y + height > canvas.height) ? canvas.height : vert[0].y + height;
    vert[1] = Object.assign({}, { x: targetX, y: targetY });

    NShape(vert, null, null);
    return vert;
}

function createAreaPlus(list, vert, width, height) {
    console.log("Berhasil", ref);
    let mid = [{x:0, y:0}, {x:0, y:0}];
    let isSquare = true;
    let isMirror = false;
    vert = JSON.parse(JSON.stringify(vert));
    vert[0] = Object.assign({}, { x: vert[1].x, y: list[ref][1].y });
    let targetX = (vert[0].x + width > canvas.width) ? canvas.width : vert[0].x + width;
    let targetY = (vert[0].y + height > canvas.height) ? canvas.height : vert[0].y + height;
    vert[1] = Object.assign({}, { x: targetX, y: vert[0].y + height });

    // Edit dibagian bawah ini
    // Entry point - Jika melebihi area referensi ke satu
    if (vert[1].x > list[ref][1].x) {
        // ref = (ref + 1) % list.length;
        ref++;

        // Jika tinggi tidak rata, maka cari midpoint L/invert L
        if (list[ref-1][1].y != list[ref][1].y && list[ref-1][1].x == list[ref][0].x) {
            // Jika tinggi area saat ini kurang, maka tambah tinggi 200
            if (vert[1].y <= list[ref][1].y) vert[1].y += 200;
            // Titik midpoint bentuk L/invert L
            mid[0] = Object.assign({}, { x: list[ref-1][1].x, y: vert[0].y });
            mid[1] = Object.assign({}, { x: list[ref][0].x, y: list[ref][1].y });
            isSquare = false;
        }

        // Entry point - Jika melebihi area referensi ke dua
        if (vert[1].x <= canvas.width && vert[1].x > list[ref][1].x) {
            // ref = (ref + 1) % list.length;
            ref++;
            // Jika tinggi tidak rata, maka cari midpoint mirror L
            if (list[ref-1][1].y != list[ref][1].y) {
                // Jika tinggi area saat ini kurang, maka tambah tinggi 200
                if (vert[1].y <= list[ref][1].y) vert[1].y += 200;
                // Titik midpoint bentuk mirror L
                mid.push({ x: list[ref-1][1].x, y: list[ref-1][1].y });
                mid.push({ x: list[ref][0].x, y: list[ref][1].y });
                isMirror = true;
            }
        }
        
        // Jika panjang sama dengan area referensi, maka pindah referensi
        if (vert[1].x == list[ref][1].x) /* ref = (ref + 1) % list.length; */ ref++;

        // Tidak memiliki pola persegi panjang
        if (!isSquare) {
            // Jika area memiliki pola mirror L, maka gambar area bentuk L
            if (!isMirror)
                LShape(vert, mid);
            // Jika tidak memiliki pola Mirror L, maka gambar area bentuk Mirror L
            else 
                MLShape(vert, mid);
        }
        // Memiliki pola persegi panjang
        else {
            // Jika memiliki pola mirror L, maka area berbentuk persegi panjang dan L
            if (isMirror)
                BLShape(vert, mid);
            // Jika tidak memiliki pola mirror L, maka area berbentuk persegi panjang
            else
                NShape(vert, list, ref);
        }
    }
    else {
        if (vert[1].x == list[ref][1].x) {
            ref++;
            NShape(vert, list, ref-1);
        } else {
            NShape(vert, list, ref);
        }
    }

    return vert;
}

function outlineLShape(vert, mid) {
    ctx.beginPath();
    ctx.moveTo(vert[0].x, vert[0].y);
    ctx.lineTo(mid[0].x, mid[0].y);
    ctx.lineTo(mid[1].x, mid[1].y);
    ctx.lineTo(vert[1].x, mid[1].y);
    ctx.lineTo(vert[1].x, vert[1].y);
    ctx.lineTo(vert[0].x, vert[1].y);
    ctx.closePath();
    ctx.stroke();

    ctx.font = "16px serif";
    ctx.fillText(`${count}-L`, vert[0].x + 40, vert[0].y + 40);
}

function outlineMLShape(vert, mid) {
    ctx.beginPath();
    ctx.moveTo(vert[0].x, vert[0].y);
    ctx.lineTo(mid[0].x, mid[0].y);
    ctx.lineTo(mid[1].x, mid[1].y);
    ctx.lineTo(mid[2].x, mid[2].y);
    ctx.lineTo(mid[3].x, mid[3].y);
    ctx.lineTo(vert[1].x, mid[3].y);
    ctx.lineTo(vert[1].x, vert[1].y);
    ctx.lineTo(vert[0].x, vert[1].y);
    ctx.closePath();
    ctx.stroke();
}

function drawShapeBigL(vert, mid) {
    ctx.beginPath();
    ctx.moveTo(vert[0].x, vert[0].y);
    ctx.lineTo(mid[2].x, mid[2].y);
    ctx.lineTo(mid[3].x, mid[3].y);
    ctx.lineTo(vert[1].x, mid[3].y);
    ctx.lineTo(vert[1].x, vert[1].y);
    ctx.lineTo(vert[0].x, vert[1].y);
    ctx.closePath();
    ctx.stroke();
}

// Normal Shape (rectangle)
function NShape(vert, list, idxRef) {
    // ctx.strokeRect(vert[0].x, vert[0].y, vert[1].x - vert[0].x, vert[1].y - vert[0].y);
    
    // Draw road NShape
    drawRoad_NShape(vert);
    
    // Draw building NShape
    drawBuilding_NShape(vert);

    debugger;
    // Area text name
    ctx.font = "16px serif";
    ctx.fillText(`${count}-N`, vert[0].x + 30, vert[0].y + 50);
}

// L Shape
function LShape(vert, mid) {
    // outlineLShape(vert, mid);

    let midY = sortAndSwap(mid[0].y, mid[1].y);
    let midX = (mid[0].y > mid[1].y) ? mid[0].x : mid[0].x - areaPad;
    
    // Draw road LShape
    drawRoad_LShape(vert, mid, midX, midY);

    // Draw building LShape
    drawBuilding_LShape(vert, mid, midX, midY);

    // Area text name
    ctx.font = "16px serif";
    ctx.fillText(`${count}-L`, vert[0].x + 30, vert[0].y + 50);
}

// Mirror L Shape
function MLShape(vert, mid) {
    // outlineMLShape(vert, mid);

    let lMidY = sortAndSwap(mid[0].y, mid[1].y);
    let rMidY = sortAndSwap(mid[2].y, mid[3].y);
    
    // Draw road MLShape
    drawRoad_MLShape(vert, mid, rMidY, lMidY);

    // Area text name
    ctx.font = "16px serif";
    ctx.fillText(`${count}-ML`, vert[0].x + 30, vert[0].y + 50);
}

function BLShape(vert, mid) {
    console.log("Big L");
    let midY = sortAndSwap(mid[2].y, mid[3].y);

    // Draw road BLShape
    drawRoad_BLShape(vert, mid, midY);

    // Area text name
    ctx.font = "16px serif";
    ctx.fillText(`${count}-BL`, vert[0].x + 30, vert[0].y + 50);
}

function drawRoad_NShape(vert) {
    // Road in Y axis
    for (let i = vert[0].y; i < vert[1].y; i += roadPad) {
        if (i > vert[0].y && i < vert[1].y - roadPad) {
            ctx.drawImage(road.straight.left, vert[1].x - areaPad, i); // Rightside
            ctx.drawImage(road.straight.right, vert[0].x, i); // Leftside
        }
    }

    // Road in X axis
    for (let i = vert[0].x; i < vert[1].x; i += roadPad) {
        if (i > vert[0].x && i < vert[1].x - roadPad) {
            ctx.drawImage(road.straight.bottom, i, vert[0].y);
            ctx.drawImage(road.straight.top, i, vert[1].y - areaPad);
        }
    }

    ctx.drawImage(road.inter.bottom.right, vert[0].x, vert[0].y); // Top-left corner
    ctx.drawImage(road.inter.bottom.left, vert[1].x - roadPad, vert[0].y) // Top-right corner
    ctx.drawImage(road.inter.top.right, vert[0].x, vert[1].y - roadPad); // Bottom-left corner
    ctx.drawImage(road.inter.top.left, vert[1].x - roadPad, vert[1].y - roadPad); // Bottom-right corner
}

function drawRoad_LShape(vert, mid, midX, midY) {
    debugger;
    var mStraightRoad = (mid[0].y > mid[1].y) ? road.straight.right : road.straight.left;

    // Road in Y axis
    for (let i = midY[0]; i < vert[1].y; i += roadPad) {
        // Left side Y axis
        if (i > vert[0].y && i < vert[1].y)
            ctx.drawImage(road.straight.right, vert[0].x, i);
        // Right side Y axis
        if (i > mid[1].y && i < vert[1].y)
            ctx.drawImage(road.straight.left, vert[1].x - areaPad, i);
        // Inner side Y axis
        if (i > midY[0] && i < midY[1])
            ctx.drawImage(mStraightRoad, midX, i);
    }

    // Road in X axis
    for (let i = vert[0].x; i < vert[1].x; i += roadPad) {
        // Top-left side
        if (i > vert[0].x && i < mid[0].x - roadPad)
            ctx.drawImage(road.straight.bottom, i, vert[0].y);
        // Top-right side
        if (i > mid[0].x && i < vert[1].x - roadPad) 
            ctx.drawImage(road.straight.bottom, i, mid[1].y);
        // Bottom side
        if (i > vert[0].x && i < vert[1].x - roadPad)
            ctx.drawImage(road.straight.top, i, vert[1].y - areaPad);
    }
}

function drawRoad_MLShape(vert, mid, rMidY, lMidY) {
    let beginY = (lMidY[0] > rMidY[0]) ? rMidY[0] : lMidY[0];

    // Load assets in certain condition
    let lRoad = (mid[0].y > mid[1].y) ?
    {
        straight: road.straight.right,
        corner: road.corner.right,
        inter: road.inter.bottom.right,
        posX: mid[0].x
    }
    :
    {
        straight: road.straight.left,
        corner: road.corner.left,
        inter: road.inter.bottom.left,
        posX: mid[0].x - areaPad
    }

    let rRoad = (mid[2].y > mid[3].y) ?
    {
        straight: road.straight.right,
        corner: road.corner.right,
        inter: road.inter.bottom.right,
        posX: mid[2].x
    }
    :
    {
        straight: road.straight.left,
        corner: road.corner.left,
        inter: road.inter.bottom.left,
        posX: mid[2].x - areaPad
    }

    // Road in Y axis
    for (let i = beginY; i <= vert[1].y; i += roadPad ) {
        // Left side
        if (i >= vert[0].y)
            ctx.drawImage(road.straight.right, vert[0].x, i);
        // Right side
        if (i >= mid[3].y)
            ctx.drawImage(road.straight.left, vert[1].x - areaPad, i);
        // Middle left side
        if (i >= lMidY[0] && i < lMidY[1])
            ctx.drawImage(lRoad.straight, lRoad.posX, i);
        // Middle right side
        if (i >= rMidY[0] && i < rMidY[1])
            ctx.drawImage(rRoad.straight, rRoad.posX, i);
    }

    // Road in X axis
    for (let i = vert[0].x; i <= vert[1].x; i += roadPad) {
        // Top left side
        if (i > vert[0].x && i < mid[0].x - roadPad)
            ctx.drawImage(road.straight.bottom, i, vert[0].y);
        // Top middle side
        if (i >= mid[1].x && i < mid[2].x)
            ctx.drawImage(road.straight.bottom, i, mid[1].y);
        // Top right side
        if (i > mid[3].x && i < vert[1].x - roadPad)
            ctx.drawImage(road.straight.bottom, i, mid[3].y);
        // Bottom side
        if (i > vert[0].x && i < vert[1].x - roadPad)
            ctx.drawImage(road.straight.top, i, vert[1].y - areaPad);
    }

    // Intersection
    ctx.drawImage(lRoad.inter, lRoad.posX, lMidY[0]); // Mid-left inter
    ctx.drawImage(rRoad.inter, rRoad.posX, rMidY[0]); // Mid-right inter

    // Corner
    ctx.drawImage(road.inter.bottom.right, vert[0].x, vert[0].y); // Top-left corner
    ctx.drawImage(road.inter.top.right, vert[0].x, vert[1].y - roadPad); // Bot-left corner
    ctx.drawImage(road.inter.bottom.left, vert[1].x - roadPad, mid[3].y); // Top-right corner
    ctx.drawImage(road.inter.top.left, vert[1].x - roadPad, vert[1].y - roadPad); // Bot-right corner
    ctx.drawImage(lRoad.corner, lRoad.posX, lMidY[1]); // Mid-left corner
    ctx.drawImage(rRoad.corner, rRoad.posX, rMidY[1]); // Mid-right corner
}

function drawRoad_BLShape(vert, mid, midY) {
    // Load assets in certain condition
    let mRoad = (mid[2].y > mid[3].y) ? 
    {
        mid: {img: road.straight.right, posX: mid[2].x},
        corner: {img: road.corner.right, posX: mid[2].x},
        inter: {img: road.inter.bottom.right, posX: mid[2].x},
        gap: {img: road.straight.bottom, posX: mid[2].x - roadPad}
    } 
    : 
    {
        mid: {img: road.straight.left, posX: mid[2].x - roadPad},
        corner: {img: road.corner.left, posX: mid[2].x - roadPad},
        inter: {img: road.inter.bottom.left, posX: mid[2].x - roadPad},
        gap: {img: road.straight.bottom, posX: mid[2].x}
    }

    // Road in Y axis
    for (let i = midY[0]; i < vert[1].y - roadPad; i += roadPad) {
        // Left-side
        if (i > vert[0].y)
            ctx.drawImage(road.straight.right, vert[0].x, i);
        // Right-side
        if (i > mid[3].y)
            ctx.drawImage(road.straight.left, vert[1].x - areaPad, i);
        if (i > midY[0] && i < midY[1])
            ctx.drawImage(mRoad.mid.img, mRoad.mid.posX, i);
    }

    // Road in X axis
    for (let i = vert[0].x; i < vert[1].x; i += roadPad) {
        // Top-left side
        if (i > vert[0].x && i < mid[2].x - roadPad)
            ctx.drawImage(road.straight.bottom, i, vert[0].y);
        // Top-right side
        else if (i > mid[3].x && i < vert[1].x - roadPad)
            ctx.drawImage(road.straight.bottom, i, mid[3].y);
        // Bottom side
        if (i > vert[0].x && i < vert[1].x - roadPad)
            ctx.drawImage(road.straight.top, i, vert[1].y - roadPad);
    }
}

function drawBuilding_NShape(vert) {
    let buildPosX = [vert[0].x + roadPad, vert[0].x + roadPad];
    let biggest = [0, 0];

    // Building in X axis
    for (let i = vert[0].x + padding; i < vert[1].x - padding; i += 10) {
        let idx;

        idx = (vert[1].y - vert[0].y <= 200) ? getRandomInt(2, 3) : getRandomInt(0, 1);
        while (idx < buildIdx.length - 1) {
            if (i + buildIdx[idx].w > vert[1].x || (vert[1].y - vert[0].y <= 200 && idx < 2)) idx++;
            else break;
        }
        if (i > buildPosX[0] && i + buildIdx[idx].w < vert[1].x - roadPad) {
            ctx.drawImage(buildIdx[idx].up, i, vert[0].y + areaPad, buildIdx[idx].w, buildIdx[idx].h);
            buildPosX[0] = i + buildIdx[idx].w;

            biggest[0] = (buildIdx[idx].h > biggest[0]) ? buildIdx[idx].h + areaPad : biggest[0];
        }
    
        if (vert[1].y - vert[0].y <= 100) continue;
    
        idx = (vert[1].y - vert[0].y <= 200) ? getRandomInt(2, 3) : getRandomInt(0, 2);
        while (idx < buildIdx.length - 1) {
            if (i + buildIdx[idx].w > vert[1].x || (vert[1].y - vert[0].y <= 200 && idx < 2)) idx++;
            else break;
        }
        if (i > buildPosX[1] && i + buildIdx[idx].w < vert[1].x - roadPad) {
            ctx.drawImage(buildIdx[idx].down, i, vert[1].y - areaPad - buildIdx[idx].h, buildIdx[idx].w, buildIdx[idx].h);
            buildPosX[1] = i + buildIdx[idx].w;

            biggest[1] = (buildIdx[idx].h + areaPad > biggest[1]) ? buildIdx[idx].h + areaPad : biggest[1];
        }
    }

    // Building in Y axis
    let buildPosY = [0, 0];
    let middle_gap = (vert[1].y - vert[0].y) - (biggest[0] + biggest[1]);
    console.log("mid", middle_gap);
    if (middle_gap > 100 && vert[1].x - vert[0].x > 200) {
        for (let i = vert[0].y + biggest[0] + areaPad; i < vert[1].y - biggest[1] - areaPad; i += padding) {
            idx = middle_gap <= 200 ? getRandomInt(2, 3) : getRandomInt(0, 2);
            debugger;
            if (i > buildPosY[0] && i + buildIdx[idx].w < vert[1].y - biggest[1] - padding) {
                ctx.drawImage(buildIdx[idx].left, vert[0].x + areaPad, i, buildIdx[idx].h, buildIdx[idx].w);
                buildPosY[0] = i + buildIdx[idx].w;
            }
                
            idx = middle_gap <= 200 ? getRandomInt(2, 3) : getRandomInt(0, 2);
            if (i > buildPosY[1] && i + buildIdx[idx].w < vert[1].y - biggest[1] - padding) {
                ctx.drawImage(buildIdx[idx].right, vert[1].x - areaPad - buildIdx[idx].h, i, buildIdx[idx].h, buildIdx[idx].w);
                buildPosY[1] = i + buildIdx[idx].w;
            }
        }
    } 
}

function drawBuilding_LShape(vert, mid, midX, midY) {
    debugger;
    // Building
    let buildPosX = {
        topLeft: vert[0].x + roadPad, 
        topRight: mid[1].x + roadPad,
        bottom: vert[0].x + roadPad
    };

    for (let i = vert[0].x; i < vert[1].x; i += 10) {
        // Building
        let idx;
        // Top-left side
        idx = (mid[0].x - vert[0].x <= 100) ? getRandomInt(2, 3) : getRandomInt(0, 2);
        while (idx < buildIdx.length - 1 && i + buildIdx[idx].w > mid[0].x) {
            if (i + buildIdx[idx].w > mid[0].x || (vert[1].y - vert[0].y <= 200 && idx < 2)) idx++;
            else break;
        }
        if (i > buildPosX.topLeft && i + buildIdx[idx].w < mid[0].x - roadPad){
            ctx.drawImage(buildIdx[idx].up, i, vert[0].y + areaPad, buildIdx[idx].w, buildIdx[idx].h);
            buildPosX.topLeft = i + buildIdx[idx].w;
        }

        // Top-right side
        if (vert[1].y - mid[1].y > 100) {
            idx = (vert[1].x - mid[1].x <= 100) ? getRandomInt(2, 3) : getRandomInt(0, 2);
            while (idx < buildIdx.length - 1) {
                if (i + buildIdx[idx] > vert[1].x || (vert[1].y - mid[1].y <= 200 && idx < 2)) idx++;
                else break;
            }
            if (i > buildPosX.topRight && i + buildIdx[idx].w < vert[1].x - areaPad) {
                ctx.drawImage(buildIdx[idx].up, i, mid[1].y + areaPad, buildIdx[idx].w, buildIdx[idx].h);
                buildPosX.topRight = i + buildIdx[idx].w;
            }
        }

        // Bottom side
        idx = (vert[1].y - midY[1] <= 200) ? getRandomInt(2, 3) : getRandomInt(0, 2);
        idx = (i >= mid[1].x - areaPad && vert[1].y - midY[1] <= 100) ? 3 : idx;
        while (idx < buildIdx.length - 1 && i + buildIdx[idx].w > vert[1].x) {
            if (i + buildIdx[idx].w > vert[1].x || (vert[1].y - vert[0].y <= 200 && idx < 2)) idx++;
            else break;
        }
        if (i > buildPosX.bottom && i + buildIdx[idx].w < vert[1].x - roadPad){
            ctx.drawImage(buildIdx[idx].down, i, vert[1].y - areaPad - buildIdx[idx].h, buildIdx[idx].w, buildIdx[idx].h);
            buildPosX.bottom = i + buildIdx[idx].w;
        }
    }

    ctx.drawImage(road.inter.bottom.right, vert[0].x, vert[0].y); // Top-left corner
    ctx.drawImage(road.inter.bottom.left, vert[1].x - roadPad, mid[1].y); // Top-right corner
    ctx.drawImage(road.inter.top.right, vert[0].x, vert[1].y - roadPad); // Bottom-left corner
    ctx.drawImage(road.inter.top.left, vert[1].x - roadPad, vert[1].y - roadPad); // Bottom-right corner
    if (mid[0].y > mid[1].y) {
        ctx.drawImage(road.corner.right, mid[0].x, vert[0].y);
        ctx.drawImage(road.straight.bottom, mid[0].x - roadPad, vert[0].y);
        ctx.drawImage(road.inter.bottom.right, mid[0].x, midY[0]);
    } else {
        ctx.drawImage(road.corner.left, mid[0].x - areaPad, mid[1].y);
        ctx.drawImage(road.straight.bottom, mid[0].x, mid[1].y);
        ctx.drawImage(road.inter.bottom.left, mid[0].x - roadPad, vert[0].y);
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function sortAndSwap(a, b) {
    if (a > b) {
        let temp = a;
        a = b;
        b = temp;
    }

    return [a, b];
}