(async function(){
  try{
    if(!('DecompressionStream' in window))throw new Error('Браузер устарел.');
    const raw=atob(window.__C360_PAYLOAD||'');
    const bytes=new Uint8Array(raw.length);
    for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const bundle=JSON.parse(await new Response(stream).text());
    const style=document.createElement('style');
    style.textContent=bundle.css;
    document.head.appendChild(style);
    window.CAREER360_DATA=bundle.data;
    delete window.__C360_PAYLOAD;
    const url=URL.createObjectURL(new Blob([bundle.app],{type:'text/javascript'}));
    const script=document.createElement('script');
    script.src=url;
    script.onload=()=>URL.revokeObjectURL(url);
    script.onerror=()=>{URL.revokeObjectURL(url);throw new Error('Не удалось запустить тест.');};
    document.body.appendChild(script);
  }catch(e){
    console.error(e);
    document.getElementById('app').innerHTML='<div style="font-family:Arial,sans-serif;max-width:680px;margin:12vh auto;padding:24px;color:#344054"><h1>Не удалось запустить тест</h1><p>Обнови браузер до актуальной версии и открой страницу ещё раз.</p></div>';
  }
})();
