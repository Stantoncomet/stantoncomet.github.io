class Piece {
    constructor (_x, _y, _piece, _rot, options) {
        this.x = _x;
        this.y = _y;
        this.piece = _piece;
        this.rot = _rot;
        this.ctx = options.ctx;
        this.u = options.u;
        this.board = options.board;
        this.held = false;
    }

    move(distance) {
        this.x+=distance;
        //this.draw();
    }

    updateBoard() {
        return this.board.b;
    }
    pushBoard(new_board) {
        this.board.b = new_board;
    }

    checkOverlap() {
        let piece = this.piece[this.rot];
        let x = this.x;
        let y = this.y;
        const bh = this.board.h;
        const bw = this.board.w;
        let io = false;

        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return;
            line.forEach((cell, cx) => {
                if (!cell) return;
                const board_pos = (y*bw)+(cy*bw)+(x+cx);
                if (this.board.b[board_pos])
                    io = true
            })
        });
        if (io)
            return true;
        else
            return false;
    }

    checkEdge() {
        let piece = this.piece[this.rot];
        let x = this.x;
        let oe = false; //off edge
        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return;
            line.forEach((cell, cx) => {
                if (!cell) return;
                if (x+cx > this.board.w-1 || x+cx < 0)
                    oe = true;
            })
        });
        if (oe)
            return true;
        else
            return false;
    }

    //returns true if it will drop wrongly
    checkFuture() {
        let piece = this.piece[this.rot];
        let x = this.x;
        let y = this.y;
        const bh = this.board.h;
        const bw = this.board.w;

        let oob = false; //out of bounds
        let io = false; //is overlapping with the piece below it

        //check if each cell will be out of bounds
        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return;
            line.forEach((cell, cx) => {
                if (!cell) return;
                const board_pos = (y*bw)+(cy*bw)+(x+cx);
                const future_pos = board_pos+bw;
                if (future_pos >= bw*bh) 
                    oob = true;

                if (this.board.b[future_pos]) //if board pos is not "0"
                    io = true
            })
        });

        if (oob || io)
            return true;
        else
            return false;
    }

    checkFutureAlt(x, y) {
        let piece = this.piece[this.rot];
        const bh = this.board.h;
        const bw = this.board.w;

        let oob = false; //out of bounds
        let io = false; //is overlapping with the piece below it

        //check if each cell will be out of bounds
        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return;
            line.forEach((cell, cx) => {
                if (!cell) return;
                const board_pos = (y*bw)+(cy*bw)+(x+cx);
                const future_pos = board_pos+bw;
                if (future_pos >= bw*bh) 
                    oob = true;

                if (this.board.b[future_pos])
                    io = true
            })
        });

        if (oob || io)
            return true;
        else
            return false;
    }

    set() {
        let piece = this.piece;
        let x = this.x;
        let y = this.y;
        const bh = this.board.h;
        const bw = this.board.w;
        piece = piece[this.rot];

        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return;
            line.forEach((cell, cx) => {
                if (!cell) return;
                const board_pos = (y*bw)+(cy*bw)+(x+cx);
                this.board.b[board_pos] = this.piece[4];
            })
        })
    }

    drop() {
        this.y++;
        this.draw();
    }

    hardDrop() {
        for (let i=0; i<this.board.h; i++) {
            if (!this.checkFuture())
                this.y++;
        }
        //this.draw(); //wierdly flashes on line clear if enabled
    }

    drawGhost() {
        let piece = this.piece;
        let x = this.x;
        let y = this.y;
        
        this.ctx.fillStyle = piece[4];
        piece = piece[this.rot];

        for (let i=0; i<this.board.h; i++) {
            if (!this.checkFutureAlt(x, y))
                y++;
        }

        x*=this.u;
        y*=this.u;
        
        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return
            cy*=this.u;
            line.forEach((cell, cx) => {
                if (!cell) return; //if cell is "0", it won't draw anyting
                cx*=this.u;
                this.ctx.fillRect(x+cx,y+cy,this.u,this.u);
            })
        });
        
    }

    rotate(val) {
        this.rot+=val;
        if (this.rot > 3) 
            this.rot = 0;
        if (this.rot < 0)
            this.rot = 3;
    }

    draw() {
        let piece = this.piece;
        let x = this.x;
        let y = this.y;
        
        this.ctx.fillStyle = piece[4];
        piece = piece[this.rot];

        x*=this.u;
        y*=this.u;
        piece.forEach((line, cy) => {
            if (!Array.isArray(line)) return
            cy*=this.u;
            line.forEach((cell, cx) => {
                if (!cell) return; //if cell is "0", it won't draw anyting
                cx*=this.u;
                this.ctx.fillRect(x+cx,y+cy,this.u,this.u);
            })
        });
    }
}