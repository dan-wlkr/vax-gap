const {JSDOM}=require('jsdom');const fs=require('fs');
const html='<!doctype html><body>'+fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8')+'</body>';
function run(label,dob,setup){
  const dom=new JSDOM(html,{runScripts:'dangerously'}); const w=dom.window;
  w.eval(`state.dd='${dob[2]}';state.mm='${dob[1]}';state.yyyy='${dob[0]}';dobErrors();state.records='yes';${setup}`);
  const out=w.eval(`(()=>{const res=evaluate(),p=plan(res);
    return p.visits.map(v=>'  '+(v.off===0?'TODAY':'Visit '+(v.i+1))+' '+fmtNum(v.date)+': '+v.items.map(i=>i.name+' ['+(i.pill||'Dose '+i.dose)+']'+(i.by?' by '+i.by:'')).join(' | ')).join('\\n')
    +'\\n  LATER: '+p.later.map(r=> laterSchool(r)? r.name+' = Year '+r.v.school+' ('+schoolYearText(r.v.school)+')' : r.name+' '+fmtNum(r.when)).join(' | ')
    +'\\n  NOTES: '+res.filter(r=>r.v.id==='menbteen'&&r.note).map(r=>r.note).join('')
    +'\\n  FLU BANNER: '+fluBanner(ageWeeks()) })()`);
  console.log(label+'\n'+out+'\n');
}
const adultDone="state.doses.hex=3;state.doses.mmrv={mmr:2,mmrv:0};state.doses.hpv=1;state.doses.td=1;state.doses.acwy=1;state.last={hex:isoUTC('2012-01-01'),mmrv:isoUTC('2012-01-01'),hpv:isoUTC('2021-01-01'),td:isoUTC('2022-01-01'),acwy:isoUTC('2022-01-01')};";
run('1) Born 15 Mar 2008, no MenB',['2008','03','15'],adultDone+"state.doses.menbteen={type:'none',dates:[]};");
run('2) Born 15 Mar 2008, Bexsero 1 Oct 2026',['2008','03','15'],adultDone+"state.doses.menbteen={type:'bexsero',dates:[isoUTC('2026-10-01')]};");
run('3) Born 15 Mar 2008, Trumenba Aug 2026 (15 Aug)',['2008','03','15'],adultDone+"state.doses.menbteen={type:'trumenba',dates:[isoUTC('2026-08-15')]};");
run('4) Born 3 Aug 2024, infant course + 1 year MMR, PCV, MenB',['2024','08','03'],"state.doses={hex:3,rota:2,menb:3,pcv:2,mmrv:{mmr:1,mmrv:0}};state.last={hex:isoUTC('2024-11-23'),rota:isoUTC('2024-10-26'),menb:isoUTC('2025-08-03'),pcv:isoUTC('2025-08-03'),mmrv:isoUTC('2025-08-03')};");
run('5) Born 15 Mar 2021, up to date with 2 MMR',['2021','03','15'],"state.doses={hex:3,rota:2,menb:3,pcv:2,mmrv:{mmr:2,mmrv:0},pre:1};state.last={hex:isoUTC('2021-07-05'),rota:isoUTC('2021-06-07'),menb:isoUTC('2022-03-15'),pcv:isoUTC('2022-03-15'),mmrv:isoUTC('2024-07-15'),pre:isoUTC('2024-07-15')};");
run('School year check: born 3 Aug 2024 vs 15 Oct 2024',['2024','10','15'],"state.records='no';");
// Doses from abroad: same day DTP + polio counts as a 6-in-1 dose only if the polio counts (IPV, or OPV before April 2016)
run('Abroad 1) Born 10 Jan 2014, pentavalent + OPV x3 in 2014, measles at 9 months',['2014','01','10'],"state.doses={hex:0,mmrv:{mmr:0,mmrv:0},pre:0};state.abroad=[['penta','2014-03-07'],['opv','2014-03-07'],['penta','2014-04-04'],['opv','2014-04-04'],['penta','2014-05-02'],['opv','2014-05-02'],['m','2014-10-10']].map(([p,t])=>({p,t:isoUTC(t)}));");
run('Abroad 2) Born 10 Mar 2023, DTP + IPV x3, MR 4 weeks ago',['2023','03','10'],"state.doses={hex:0,rota:0,menb:0,pcv:0,mmrv:{mmr:0,mmrv:0}};state.abroad=[['dtp','2023-05-05'],['ipv','2023-05-05'],['dtp','2023-06-02'],['ipv','2023-06-02'],['dtp','2023-06-30'],['ipv','2023-06-30'],['mr','2026-09-20']].map(([p,t])=>({p,t:isoUTC(t)}));");
run('Abroad 3) Born 10 Mar 2023, pentavalent + OPV x3 in 2023',['2023','03','10'],"state.doses={hex:0,rota:0,menb:0,pcv:0,mmrv:{mmr:0,mmrv:0}};state.abroad=[['penta','2023-05-05'],['opv','2023-05-05'],['penta','2023-06-02'],['opv','2023-06-02'],['penta','2023-06-30'],['opv','2023-06-30']].map(([p,t])=>({p,t:isoUTC(t)}));");
