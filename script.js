import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://tlcnrceiczgzohcqqbyc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsY25yY2VpY3pnem9oY3FxYnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMDAxODAsImV4cCI6MjA2NzU3NjE4MH0.iS5Ftya0cnF3RwjzputHs6QaA-3eJRrBaI9AR2fx4FM";

const supabase = createClient(supabaseUrl, supabaseKey);

async function carregarLojas() {
  const container = document.getElementById("lojas-container");
  container.innerHTML = "";

  const { data, error } = await supabase.from("lojas").select("*");

  if (error) {
    container.innerHTML = "<p>Erro ao carregar lojas.</p>";
    console.error(error);
    return;
  }

  if (data.length === 0) {
    container.innerHTML = "<p>Nenhuma loja encontrada.</p>";
    return;
  }

  data.forEach((loja) => {
    const div = document.createElement("div");
    div.className = "loja";

    const img = document.createElement("img");
    img.src = loja.logo_url || "https://via.placeholder.com/120?text=Logo";
    img.alt = `Logo da ${loja.nome}`;

    const nome = document.createElement("h2");
    nome.textContent = loja.nome;

    const botao = document.createElement("button");
    botao.textContent = "Ver Endereço";
    botao.onclick = () => alert(`Endereço da loja:\n${loja.endereco}`);

    div.appendChild(img);
    div.appendChild(nome);
    div.appendChild(botao);

    container.appendChild(div);
  });
}

carregarLojas();
