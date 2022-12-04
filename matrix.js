class Matrix {
   #data = [];
   #blockSize;
   #matrixRows;
   #matrixColumns;

   constructor(rows = 7, columns = 30, block = 32) {
      this.blockSize = block;
      this.matrixRows = rows;
      this.matrixColumns = columns;

      this.clear();
   }

   clear(bgColor = '#fff') {
     this.data = [];
     for (let i = 0; i < this.matrixRows; i++) {
       this.data.push('x'.repeat(this.matrixColumns).split('').map(() => bgColor));
     }
     document.querySelector('.output').innerHTML='';
   }

   dump () {
      let buf = [];
      this.data.forEach((row,y) => {
        row.forEach((cell,x) => {
          if (cell !== '#fff') {
            buf.push(`${x+1},${y+1},${cell}`);
          }
        });
      });
      document.querySelector('.output').innerHTML = `${buf.join(' ')}`;
    }

    set (str) {
      const token = str.split(' ');
      token.forEach(item => {
        const [x,y,color] = item.split(',');
    
        if (x && y && color) {
          if (x >= 0 && y>= 0 && x < this.matrixColumns && y < this.matrixRows) {
            this.data[y-1][x-1] = color;
          }
        }
      });    
    } 

    moveX(str, xoffset) {
      const buf = [];
      const token = str.split(' ');
      token.forEach(item => {
        const [x,y,color] = item.split(',');
        buf.push(`${parseInt(x,10)+parseInt(xoffset,10)},${y},${color}`);
      });
      const moved = buf.join(' ');
      this.set(moved);
      return moved;
    }

    play(str, xoffset, moveXBy, steps, delay) {
      const moved = this.moveX(str, xoffset);
      this.render();

      setTimeout(() => {
        if (steps >0) {
          this.clear();
        
          this.play(moved,moveXBy,moveXBy, steps-1, delay);
          this.render();
        }
      }, delay);
    }

    collect(x,y) {
         this.set(`${x},${y},#000`);
         this.render();
    }

    render (sel = '.matrix') {
      const obj = document.querySelector(sel);
      
      let html='';
      
      this.data.forEach((row,y) => {
        row.forEach((cell,x) => {
          const dbg = `ma.collect(${x+1},${y+1})`;
          html += `<div style="border:1px solid #f5f5f5;width:${this.blockSize}px;height:${this.blockSize}px;background-color:${cell}" onClick=${dbg}></div>`;
        });
        html+='<div class="break"></div>';
      });
      obj.innerHTML = html;
    }
}

const ma = new Matrix();

ma.play('2,2,#000 5,2,#000 7,2,#000 8,2,#000 9,2,#000 11,2,#000 15,2,#000 20,2,#000 21,2,#000 25,2,#000 2,3,#000 5,3,#000 7,3,#000 11,3,#000 15,3,#000 19,3,#000 22,3,#000 25,3,#000 2,4,#000 3,4,#000 4,4,#000 5,4,#000 7,4,#000 8,4,#000 9,4,#000 11,4,#000 15,4,#000 19,4,#000 22,4,#000 25,4,#000 2,5,#000 5,5,#000 7,5,#000 11,5,#000 15,5,#000 19,5,#000 22,5,#000 2,6,#000 5,6,#000 7,6,#000 8,6,#000 9,6,#000 11,6,#000 12,6,#000 13,6,#000 15,6,#000 16,6,#000 17,6,#000 20,6,#000 21,6,#000 25,6,#000', 30, -1, 60, 100);
ma.render();
