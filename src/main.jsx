import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const KEY = 'atos-launcher-links-v1';
const uid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
function normalize(raw) {
  let value = raw.trim();
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) return null;
    return url.href;
  } catch {return null;}
}
function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(x => x && typeof x.name === 'string' && typeof x.url === 'string' && normalize(x.url)).map(x => ({id: String(x.id || uid()),name:x.name,url:normalize(x.url),enabled:x.enabled !== false}));
  } catch {return [];}
}
function App() {
  const [links,setLinks] = useState(load);
  const [name,setName] = useState('');
  const [url,setUrl] = useState('');
  const [editing,setEditing] = useState(null);
  const [message,setMessage] = useState('');
  const active = links.filter(x => x.enabled);
  function update(next) {setLinks(next);localStorage.setItem(KEY,JSON.stringify(next));}
  function reset() {setName('');setUrl('');setEditing(null);}
  function save(e) {
    e.preventDefault();
    const clean = normalize(url);
    if (!name.trim() || !clean) {setMessage('Informe um nome e uma URL válida (http ou https).');return;}
    if (editing) update(links.map(x => x.id === editing ? {...x,name:name.trim(),url:clean} : x));
    else update([...links,{id:uid(),name:name.trim(),url:clean,enabled:true}]);
    reset();setMessage('Link salvo.');
  }
  function edit(item) {setEditing(item.id);setName(item.name);setUrl(item.url);setMessage('');document.getElementById('name')?.focus();}
  function remove(item) {if (!window.confirm(`Excluir ${item.name}?`)) return;update(links.filter(x => x.id !== item.id));if (editing === item.id) reset();setMessage('Link excluído.');}
  function launch() {
    if (!active.length) return;
    let blocked = 0;
    for (const item of active) {
      const tab = window.open(item.url,'_blank');
      if (!tab) blocked++;
      else {try {tab.opener = null;} catch {}}
    }
    setMessage(blocked ? `${blocked} aba(s) podem ter sido bloqueadas. Autorize pop-ups para este site no navegador.` : `${active.length} link(s) enviados para abertura. Verifique as novas abas.`);
  }
  return <main className="shell">
    <header className="header"><div className="brandmark">↗</div><div><h1>Atos Launcher</h1><p>Seu workspace, em um clique.</p></div></header>
    <section className="panel"><div className="section-head"><div><h2>Meu ambiente</h2><p>{active.length} {active.length === 1 ? 'site ativo' : 'sites ativos'} de {links.length}</p></div><button className="launch" onClick={launch} disabled={!active.length}>▶ Iniciar trabalho</button></div>
    <div className="items">{links.length ? links.map(item => <div className="item" key={item.id}><label className="toggle" title="Incluir ao iniciar"><input type="checkbox" checked={item.enabled} onChange={() => update(links.map(x => x.id === item.id ? {...x,enabled:!x.enabled} : x))}/><span/></label><div className="site"><strong>{item.name}</strong><small>{item.url}</small></div><div className="actions"><a href={item.url} target="_blank" rel="noopener noreferrer" title="Abrir individualmente" aria-label={`Abrir ${item.name}`}>↗</a><button onClick={() => edit(item)} title="Editar" aria-label={`Editar ${item.name}`}>✎</button><button onClick={() => remove(item)} title="Excluir" aria-label={`Excluir ${item.name}`}>×</button></div></div>) : <div className="empty">Nenhum site cadastrado. Adicione seu primeiro link abaixo.</div>}</div></section>
    <section className="panel form-panel"><h2>{editing ? 'Editar site' : 'Adicionar site'}</h2><form onSubmit={save}><label htmlFor="name">Nome<input id="name" maxLength="70" placeholder="Ex.: ChatGPT" value={name} onChange={e=>setName(e.target.value)} required/></label><label htmlFor="url">Endereço<input id="url" type="text" inputMode="url" placeholder="https://chatgpt.com" value={url} onChange={e=>setUrl(e.target.value)} required/></label><div className="form-actions"><button className="save" type="submit">{editing ? 'Salvar alterações' : '+ Adicionar link'}</button>{editing && <button className="cancel" type="button" onClick={reset}>Cancelar</button>}</div></form></section>
    {message && <p className="notice" role="status">{message}</p>}
    <footer>Atos Launcher · Seus links ficam salvos neste navegador.</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);