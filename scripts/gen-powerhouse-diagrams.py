#!/usr/bin/env python3
"""Generate clean on-brand SVG diagrams for the Powerhouse quest."""
from pathlib import Path
OUT = Path("src/GAME_DATA/powerhouse/assets/images"); OUT.mkdir(parents=True, exist_ok=True)

# palette
NAVY="#0d1b2e"; CARD="#13243a"; WHITE="#eaf2fb"; MUTE="#9fb3c8"
GOLD="#e7c869"; TEAL="#0E7C86"; ORANGE="#E0552B"; BLUE="#5aa9ff"; PURPLE="#7d6cf0"; ATPY="#ffd166"
GREEN="#2e9b57"; RED="#c0392b"

DEFS = (f'<defs>'
  f'<marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">'
  f'<path d="M0,0 L7,3 L0,6 Z" fill="{WHITE}"/></marker>'
  f'<marker id="ahm" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">'
  f'<path d="M0,0 L7,3 L0,6 Z" fill="{MUTE}"/></marker>'
  f'</defs>')

def card(w,h): return f'<rect x="2" y="2" width="{w-4}" height="{h-4}" rx="18" fill="{NAVY}" stroke="#24405f" stroke-width="2"/>'
def txt(x,y,s,size=16,fill=WHITE,anchor="middle",weight="normal"):
    return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>'
def svg(w,h,body): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{DEFS}{card(w,h)}{body}</svg>'

def mito(cx,cy,rx,ry):
    s=f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#3a2363" stroke="{GOLD}" stroke-width="4"/>'
    for i in range(-2,3):
        s+=f'<path d="M {cx-rx*0.7} {cy+i*ry*0.4} q {rx*0.7} {ry*0.5} {rx*1.4} 0" fill="none" stroke="{BLUE}" stroke-width="3" opacity="0.8"/>'
    return s

def battery(x,y,w,h,label="ATP"):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{ATPY}"/>'
            f'<rect x="{x+w}" y="{y+h*0.3}" width="9" height="{h*0.4}" rx="3" fill="{ATPY}"/>'
            f'{txt(x+w/2,y+h/2+8,label,22,"#5a3d00",weight="bold")}')

# ---------- 1. Respiration in -> out ----------
b=""
b+=txt(340,40,"How the engine makes energy",24,WHITE,weight="bold")
b+=f'<rect x="36" y="92" width="170" height="46" rx="23" fill="{GOLD}"/>'+txt(121,121,"Glucose (fuel)",17,"#2a2310",weight="bold")
b+=f'<rect x="36" y="150" width="170" height="46" rx="23" fill="{BLUE}"/>'+txt(121,179,"Oxygen",17,"#08233f",weight="bold")
b+=f'<line x1="214" y1="115" x2="280" y2="150" stroke="{WHITE}" stroke-width="3" marker-end="url(#ah)"/>'
b+=f'<line x1="214" y1="173" x2="280" y2="160" stroke="{WHITE}" stroke-width="3" marker-end="url(#ah)"/>'
b+=mito(360,158,72,46)+txt(360,232,"mitochondrion",14,MUTE)
b+=f'<line x1="438" y1="150" x2="498" y2="150" stroke="{WHITE}" stroke-width="3" marker-end="url(#ah)"/>'
b+=battery(508,118,108,66)+txt(562,210,"energy your cells spend",13,MUTE)
b+=f'<line x1="360" y1="208" x2="360" y2="262" stroke="{MUTE}" stroke-width="2.5" marker-end="url(#ahm)"/>'
b+=txt(360,292,"leftover: water + carbon dioxide (you breathe it out)",14,MUTE)
(OUT/"respiration.svg").write_text(svg(680,320,b))

# ---------- 2. VO2max comparison ----------
b=""
b+=txt(340,40,"VO₂max — oxygen you can use (mL / kg / min)",21,WHITE,weight="bold")
rows=[("Couch potato",35,MUTE),("Maya (you)",50,TEAL),("Elite athlete",80,ORANGE),("World record",97,ATPY)]
y0=80; bx=200; scale=4.4
for i,(lbl,val,col) in enumerate(rows):
    y=y0+i*62
    b+=txt(186,y+30,lbl,16,WHITE,anchor="end")
    b+=f'<rect x="{bx}" y="{y+8}" width="{val*scale}" height="36" rx="8" fill="{col}"/>'
    b+=txt(bx+val*scale+26,y+33,str(val),20,col,anchor="middle",weight="bold")
b+=txt(340,348,"More muscle working + more mitochondria = a higher number",13,MUTE)
(OUT/"vo2max-bars.svg").write_text(svg(680,366,b))

# ---------- 3. Aerobic vs anaerobic ----------
b=""
b+=txt(350,38,"Why your muscles burn",24,WHITE,weight="bold")
b+=f'<rect x="24" y="64" width="320" height="248" rx="14" fill="rgba(46,155,87,0.12)" stroke="{GREEN}" stroke-width="2"/>'
b+=txt(184,92,"WITH enough oxygen",17,GREEN,weight="bold")
b+=mito(120,168,52,34)
for i in range(6):
    bx=200+(i%3)*44; by=128+(i//3)*52
    b+=battery(bx,by,34,26,"")+txt(bx+17,by+18,"ATP",10,"#5a3d00",weight="bold")
b+=txt(184,300,"Plenty of energy — you cruise",14,WHITE)
b+=f'<rect x="356" y="64" width="320" height="248" rx="14" fill="rgba(192,57,43,0.12)" stroke="{RED}" stroke-width="2"/>'
b+=txt(516,92,"NOT enough oxygen",17,"#ff7a6b",weight="bold")
b+=mito(452,168,52,34)+txt(452,210,"stalls",12,"#ff9a8c")
b+=battery(540,150,34,26,"")+txt(557,168,"ATP",10,"#5a3d00",weight="bold")
b+=txt(516,250,"Backup kicks in → lactic acid",14,WHITE)
b+=txt(516,276,"→ the BURN, and you gasp",15,"#ff9a8c",weight="bold")
(OUT/"aerobic-anaerobic.svg").write_text(svg(700,330,b))

# ---------- 4. Two genomes ----------
b=""
b+=txt(350,38,"You carry TWO sets of DNA",24,WHITE,weight="bold")
b+=f'<circle cx="180" cy="180" r="92" fill="#1b3a5f" stroke="{BLUE}" stroke-width="3"/>'
for i in range(6):
    ox=150+(i%3)*30; oy=150+(i//3)*40
    b+=f'<path d="M {ox} {oy} q 12 -16 24 0 q -12 16 0 32 q -12 -16 -24 0 z" fill="{BLUE}" opacity="0.85"/>'
b+=txt(180,300,"Nuclear DNA",17,WHITE,weight="bold")
b+=txt(180,322,"~20,000 genes · from BOTH parents",13,MUTE)
b+=mito(520,176,78,50)
b+=f'<circle cx="520" cy="176" r="20" fill="none" stroke="{ATPY}" stroke-width="5"/>'
b+=txt(520,300,"mtDNA",17,ATPY,weight="bold")
b+=txt(520,322,"~37 genes · a tiny circle · from MOM only",13,MUTE)
(OUT/"two-genomes.svg").write_text(svg(700,344,b))

# ---------- 5. Hype feed (phone) ----------
W,H=380,600; b=""
b+=f'<rect x="40" y="20" width="300" height="560" rx="34" fill="{CARD}" stroke="#2c4straight" stroke-width="0"/>'.replace("#2c4straight","#33506f")
b+=f'<rect x="40" y="20" width="300" height="560" rx="34" fill="none" stroke="#33506f" stroke-width="3"/>'
b+=f'<rect x="150" y="30" width="80" height="14" rx="7" fill="#0a1626"/>'
b+=txt(190,76,"Is any of this REAL?",18,ATPY,weight="bold")
posts=[("@gains_guru","This $80 pill TRIPLED my","mitochondria in a week!",ORANGE),
       ("@cold_king","5-min ice baths =","UNLIMITED energy",BLUE),
       ("@breath_bro","Breathe like THIS to","10× your cells",PURPLE)]
y=100
for h,l1,l2,col in posts:
    b+=f'<rect x="58" y="{y}" width="264" height="128" rx="14" fill="#0e1d31" stroke="#24405f" stroke-width="1.5"/>'
    b+=f'<circle cx="84" cy="{y+28}" r="14" fill="{col}"/>'
    b+=txt(108,y+33,h,14,WHITE,anchor="start",weight="bold")
    b+=txt(74,y+66,l1,15,WHITE,anchor="start")
    b+=txt(74,y+90,l2,15,WHITE,anchor="start")
    b+=txt(74,y+116,"♥  12.4k     ↺ 3.1k",12,MUTE,anchor="start")
    y+=148
(OUT/"hype-feed.svg").write_text(svg(W,H,b))

print("wrote:", *[p.name for p in OUT.glob("*.svg")])
