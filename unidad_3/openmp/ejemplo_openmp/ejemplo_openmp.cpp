#include <omp.h>
#include <iostream>
#include <unistd.h> // Para usar sleep
using namespace std;

void tarea_uno() {
    // Simulamos un trabajo pesado
    cout << "Ejecutando tarea 1..." << endl;
    sleep(2); // Pausa de 2 segundos
    cout << "Tarea 1 completada" << endl;
}

void tarea_dos() {
    // Simulamos un trabajo pesado
    cout << "Ejecutando tarea 2..." << endl;
    sleep(3); // Pausa de 3 segundos
    cout << "Tarea 2 completada" << endl;
}

int main() {
    int thread;
    double timeIni, timeFin;

    // Capturamos el tiempo inicial
    timeIni = omp_get_wtime();

    // Establecemos el número de hilos a 2
    omp_set_num_threads(2);

    // Región paralela con variables privadas para cada hilo
    #pragma omp parallel private(thread)
    {
        // Obtenemos el número del hilo actual
        thread = omp_get_thread_num();

        // Iniciamos la sección de tareas
        #pragma omp sections
        {
            #pragma omp section
            {
                cout << "Hebra " << thread << " ejecutando tarea 1" << endl;
                tarea_uno();
            }

            #pragma omp section
            {
                cout << "Hebra " << thread << " ejecutando tarea 2" << endl;
                tarea_dos();
            }
        } // Fin de las secciones

    } // Fin de la región paralela

    // Capturamos el tiempo final
    timeFin = omp_get_wtime();

    cout << "Tiempo tardado = " << timeFin - timeIni << " segundos" << endl;

    return 0;
}
