#include "mpi.h"
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, char *argv[])
{
    int rank, size;
    const int N = 5;  // Tamaño de cada vector es 5
    const int NP = 4; // Número de procesos (ejemplo, puedes cambiar esto al número de procesos que desees)
    
    // Vectores de tamaño NP*5
    vector<int> vecA(NP * N), vecB(NP * N);
    int localA[N], localB[N];  // Porciones locales que recibirá cada proceso
    int local_product = 0;      // Producto local de cada proceso
    int global_product = 0;     // Producto total (final) calculado por el proceso 0

    MPI_Init(&argc, &argv);                // Inicialización del entorno MPI
    MPI_Comm_size(MPI_COMM_WORLD, &size);   // Número de procesos en el comunicador global
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);   // Rango (identificador) del proceso en el comunicador global

    if (rank == 0) {
        // Inicializar los vectores con algunos valores para la prueba
        for (int i = 0; i < NP * N; ++i) {
            vecA[i] = i + 1; // Llenamos vecA con valores 1, 2, 3, ..., NP*5
            vecB[i] = (i + 1) * 2; // Llenamos vecB con valores 2, 4, 6, ..., NP*10
        }
    }

    // Usamos MPI_Scatter para distribuir partes de los vectores a los procesos
    MPI_Scatter(vecA.data(), N, MPI_INT, localA, N, MPI_INT, 0, MPI_COMM_WORLD);
    MPI_Scatter(vecB.data(), N, MPI_INT, localB, N, MPI_INT, 0, MPI_COMM_WORLD);

    // Realizamos el producto local
    for (int i = 0; i < N; ++i) {
        local_product += localA[i] * localB[i];
    }

    // Reducir el producto local al proceso 0
    MPI_Reduce(&local_product, &global_product, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        // El proceso 0 imprime el resultado final
        cout << "El producto escalar es: " << global_product << endl;
    }

    MPI_Finalize(); // Finalizamos el entorno MPI
    return 0;
}
