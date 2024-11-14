module Resursion where
potencia :: (Integer, Integer) -> Integer
potencia(b, e) = if e == 0 then 1
		else b * potencia(b, e-1)

factorial :: Integer -> Integer
factorial(x) = facaux(x, 1)

facaux :: (Integer, Integer) -> Integer
facaux(n, r) = if n == 0 then r
            else facaux(n-1, n*r)

