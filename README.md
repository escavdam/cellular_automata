# Automata Celular Elemental

## Introducción

El automata celular elemental es el automata celular de una dimensión más simple que existe.

Un automata celular consiste en un grid de celdas, cada una de las celdas puede tener dos posibles estados (0 o 1) y evoluciona en el tiempo siguiendo una regla que determina el estado de cada celda en función de su estado y el estado de sus vecinos.

El automata celular elemental es un automata celular de una dimensión, es decir, las celdas se encuentran en una línea y cada celda tiene dos vecinos (izquierda y derecha).

Nuestro programa comienza por crear un string inicial o `axioma` formado por 0s y 1s. Dependiendo del valor de cada caracter y sus vecinos, determinamos el valor que tendrá el caracter en la siguiente generación.

## Evaluar celdas

Cuando evaluamos cada celda, necesitamos tener en cuenta el estado de la celda y el estado de sus vecinos:

AXB
 1

En este ejemplo`X` es la celda que estamos evaluando, `A` es la celda izquierda, `B` es la celda derecha, `1` es el estado de la celda en la siguiente generación.

## Reglas

Si tenemos en cuenta el número de estados posibles para cada celda y el número de vecinos que tiene cada uno, podemos ver que hay 2^3 = 8 posibles combinaciones de estados para una celda y sus vecinos. 

Las combinaciones posibles son 000, 001, 010, 011, 100, 101, 110 y 111.

### Ejemplos:
### Regla 0
COMBINACION / OUTPUT
111 / 0
110 / 0
101 / 0
100 / 0
011 / 0
010 / 0
001 / 0
000 / 0

### Regla 1
COMBINACION / OUTPUT
111 / 0
110 / 0
101 / 0
100 / 0
011 / 0
010 / 0
001 / 0
000 / 1

Sabiendo que cada combinación tiene 2^3 = 8 posibles combinaciones, podemos ver que hay 2^8 = 256 posibles reglas para el automata celular elemental.

Podemos convertir el número de regla a binario y usar cada bit como el output para cada combinación.

Ejemplo:

Regla 0 = 00000000
Regla 1 = 00000001
Regla 30 = 00011110

En el caso de la regla 30, repartiriamos los outputs asi:

COMBINACION / OUTPUT
111 / 0
110 / 0
101 / 0
100 / 1
011 / 1
010 / 1
001 / 1
000 / 0

## Generaciones

El automata celular elemental evoluciona en el tiempo, cada generación es el resultado de aplicar la regla correspondiente a cada celda en la generación actual.

## Implementación

Para implementar el automata celular elemental, necesitamos un string inicial, una regla y un número de generaciones.

El string inicial es el `axioma` del automata, la regla es un número entero entre 0 y 255 y el número de generaciones es un número entero positivo.
