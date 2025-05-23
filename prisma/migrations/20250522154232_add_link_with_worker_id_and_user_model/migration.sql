-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
