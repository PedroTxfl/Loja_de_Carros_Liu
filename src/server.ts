import app from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("🐘 Fonte de dados TypeORM inicializada com sucesso!");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor Express rodando com TypeScript na porta ${PORT}`);
        });
    })
    .catch((error) => console.error("❌ Erro ao inicializar fonte de dados TypeORM:", error));