hervivoro('cuernos') :- write('Existe un 1% de que sea omnivoro').
carnivoro('venenoso').
carnivoro('cola','venenoso').
hervivoro('sincola') :-write('Existe un 2% de que sea carnivoro').
carnivoro('caparazon') :-write('Existe un 1% de que sea hervivoro').
carnivoro('gran tamaño','plumas') :-write('Existe un 50% de que sea hervivoro').
hervivoro('gran tamaño','plumas') :-write('Existe un 50% de que sea carnivoro').
hervivoro('pequeño tamaño') :-write('Existe un 58% de que sea hervivoro, un 1% de que sea omnivoro y un 41% de que sea carnivoro').
