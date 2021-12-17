# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro. 🚀

**Regra de Negócio**  
Não deve ser possível cadastrar um carro com uma placa já existente. 🚀
O carro deve ser cadastrado, por padrao, com disponibilidade. 🚀
Só deve ser possível cadastrar um carro com um usuário administrador.

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveos pelo nome da categoria.
Deve ser possível listar todos os carros disponíveos pelo nome da marca.
Deve ser possível listar todos os carros disponíveos pelo nome da carro.

**Regra de Negócio**  
O usuário não precisa estar logado no sistema para ter acesso a lista.

# Cadastro de Especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro.

**Regra de Negócio**  
Não deve ser possível cadastrar uma especificação para uma carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Só deve ser possível cadastrar uma especificação com um usuário administrador.

# Cadastro de Imagens do carro

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.

**Requisitos Não-Funcionais**
Utilizar o multer para upload dos arquivos.

**Regra de Negócio**  
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regra de Negócio**  
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
